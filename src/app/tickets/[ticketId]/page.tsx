import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticketId = +(await params).ticketId;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);
  if (!ticket)
    return (
      <Placeholder
        label="Ticket Not found"
        button={
          <Button asChild variant={"outline"}>
            <Link href={ticketsPath()}>Go to tickets</Link>
          </Button>
        }
      />
    );

  return (
    <div>
      <div>Ticket-{ticket.id}</div>
      <div>{ticket.title}</div>
      <div>{ticket.status}</div>
    </div>
  );
};
export default TicketPage;
