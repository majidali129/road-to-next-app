import { CardCompact } from "@/components/card-compact";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { TicektUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { Suspense } from "react";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9 ">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact className="w-full max-w-[420px] flex self-center" title="Create Ticket" description="A new ticket will be created" content={<TicektUpsertForm />} />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};
export default TicketsPage;
