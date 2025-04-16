import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { searchParamsCache } from "../features/ticket/search-params";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const parsedParams = searchParamsCache.parse(searchParams);
  return (
    <div className="flex-1 flex flex-col gap-y-9">
      <Heading title="All tickets" description="Tickets by everyone at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={parsedParams} />
      </Suspense>
    </div>
  );
};
export default HomePage;
