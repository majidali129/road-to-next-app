"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TicketStatusLabels } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="mr-2 w-4 h-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleTicketStatusChange = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);
    toast.promise(promise, {
      loading: "Updating status...",
    });

    const response = await promise;
    if (response.status === "SUCCESS") {
      toast.success(response.message);
    } else if (response.status === "ERROR") {
      toast.error(response.message);
    }
  };

  const ticketStatusRadioGroupItem = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleTicketStatusChange}>
      {Object.keys(TicketStatusLabels).map((label) => (
        <DropdownMenuRadioItem key={label} value={label}>
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          {ticketStatusRadioGroupItem}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
