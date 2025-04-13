import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getTicket } from "@/features/queries/get-ticket";
import { TicektUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { homePath, ticketPath } from "@/paths";

type TicketEditFormProps = {
  params: Promise<{ ticketId: string }>;
};
const TicketUpdatePage = async ({ params }: TicketEditFormProps) => {
  const { user } = await getAuth();
  const id = (await params)?.ticketId;
  const ticket = await getTicket(id);
  const isTicketOwner = await isOwner(user, ticket);
  const isTicketFound = !!ticket;

  if (!isTicketFound || !isTicketOwner) notFound();

  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Breadcrumbs breadcrumbs={[{ title: "Tickets", href: homePath() }, { title: ticket.title, href: ticketPath(ticket.id) }, { title: "Edit" }]} />

      <Separator />
      <CardCompact className="w-full max-w-[420px] mx-auto" title="Edit ticket" description="Edit an existing ticket" content={<TicektUpsertForm ticket={ticket} />} />
    </div>
  );
};
export default TicketUpdatePage;
