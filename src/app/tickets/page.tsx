import Heading from "@/components/heading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";
import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";

const ticketStatusIcon = {
  DONE: <LucideCheckCircle />,
  OPEN: <LucidePencil />,
  IN_PROGRESS: <LucideFileText />,
};
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex flex-1 flex-col  gap-y-4 items-center animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className=" w-full max-w-[420px] py-5 gap-4 rounded-md">
            <CardHeader>
              <CardTitle className="flex gap-1.5 items-center">
                <span className="*:w-5 *:h-5">{ticketStatusIcon[ticket.status]}</span>
                <span className=" truncate">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="whitespace-break-spaces line-clamp-3 text-sm">{ticket.content}</span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(String(ticket.id))} className="underline text-sm">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TicketsPage;
