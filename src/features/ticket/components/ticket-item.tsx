import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideMoreVertical, LucidePencil, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { toCurrencyFromCent } from "@/app/utils/currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath, ticketUpdatePath } from "@/paths";
import { TicketStatusIcon } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailsButton = (
    <Button asChild variant={"outline"} size={"icon"}>
      <Link href={ticketPath(ticket.id)}>
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant={"outline"} size={"icon"}>
      <Link href={ticketUpdatePath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx(" flex w-full gap-x-1.5", {
        "max-w-[520px]": isDetail,
        "max-w-[420px]": !isDetail,
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailsButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};
export default TicketItem;
