import Heading from "@/components/heading";
import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/components/ticket-item";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex flex-1 flex-col  gap-y-4 items-center animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail />
        ))}
      </div>
    </div>
  );
};
export default TicketsPage;
