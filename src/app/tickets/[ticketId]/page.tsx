import { Separator } from "@/components/ui/separator";
import { getTicket } from "@/features/queries/get-ticket";
import TicketItem from "@/features/ticket/components/ticket-item";
import { homePath } from "@/paths";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticketId = (await params).ticketId;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Breadcrumbs breadcrumbs={[{ title: "Tickets", href: homePath() }, { title: ticket.title }]} />

      <Separator />

      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};
export default TicketPage;
