import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import { ticketsPath } from "@/paths";
import Link from "next/link";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9">
      <Heading title="All tickets" description="Tickets by everyone at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};
export default HomePage;
