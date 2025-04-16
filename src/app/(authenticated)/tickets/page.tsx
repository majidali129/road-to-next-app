import { CardCompact } from "@/components/card-compact";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import { TicektUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { SearchParams } from "@/features/ticket/search-params";
import { Suspense } from "react";

const TicketsPage = async ({ searchParams }: SearchParams) => {
  const { user } = await getAuth();
  console.log(searchParams);
  return (
    <div className="flex-1 flex flex-col gap-y-9 ">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact className="w-full max-w-[420px] flex self-center" title="Create Ticket" description="A new ticket will be created" content={<TicektUpsertForm />} />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} searchParams={(await searchParams).search} />
      </Suspense>
    </div>
  );
};
export default TicketsPage;
