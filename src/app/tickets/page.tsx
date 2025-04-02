import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9 ">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};
export default TicketsPage;
