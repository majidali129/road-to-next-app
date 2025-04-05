import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { upsertTicket } from "../actions/upsert-ticket";
type TicketUpsertFormProps = {
  ticket?: Ticket;
};
const TicektUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  return (
    <form action={upsertTicket} className="flex flex-col gap-y-2">
      <input type="hidden" name="id" defaultValue={ticket?.id} />
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <Button type="submit">{ticket ? "Update" : "Create"} </Button>
    </form>
  );
};

export { TicektUpsertForm };
