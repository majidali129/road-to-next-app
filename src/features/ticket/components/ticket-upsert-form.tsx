"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicektUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), Empty_Action_State);

  return (
    <Form action={action} actionState={actionState}>
      <input type="hidden" name="id" defaultValue={ticket?.id} />
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title} />
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { TicektUpsertForm };
