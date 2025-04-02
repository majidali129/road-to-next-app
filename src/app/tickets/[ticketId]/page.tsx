import { getTicket } from "@/features/queries/get-ticket";
import TicketItem from "@/features/ticket/components/ticket-item";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticketId = +(await params).ticketId;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} />
    </div>
  );
};
export default TicketPage;
