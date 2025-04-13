import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getTicket } from "@/features/queries/get-ticket";
import { TicektUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { notFound } from "next/navigation";

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
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact className="w-full max-w-[420px]" title="Edit ticket" description="Edit an existing ticket" content={<TicektUpsertForm ticket={ticket} />} />
    </div>
  );
};
export default TicketUpdatePage;
