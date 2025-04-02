import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath } from "@/paths";
import clsx from "clsx";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { TicketStatusIcon } from "../constants";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailsButton = (
    <Button asChild variant={"outline"} size={"icon"}>
      <Link href={ticketPath(String(ticket.id))} className="text-sm">
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );
  return (
    <div
      className={clsx(" flex w-full gap-x-1.5", {
        "max-w-[420px]": isDetail,
        "max-w-[570px]": !isDetail,
      })}
    >
      <Card className="py-5 gap-4 rounded-md w-full">
        <CardHeader>
          <CardTitle className="flex gap-1.5 items-center">
            <span className="*:w-5 *:h-5">{TicketStatusIcon[ticket.status]}</span>
            <span className=" truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces text-sm", {
              "line-clamp-3": isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      {isDetail && <div className="flex flex-col gap-y-1">{detailsButton}</div>}
    </div>
  );
};
export default TicketItem;
