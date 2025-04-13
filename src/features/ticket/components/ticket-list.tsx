import { getTickets } from "@/features/queries/get-tickets";
import TicketItem from "./ticket-item";

type TicketListProps = {
  userId?: string;
};
const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId);
  return (
    <div className="flex flex-1 flex-col  gap-y-4 items-center animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
export default TicketList;
