import Placeholder from "@/components/placeholder";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { getTickets } from "@/features/queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import TicketItem from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);
  return (
    <div className="flex flex-1 flex-col  gap-y-4 items-center animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          options={[
            {
              label: "Newest",
              value: "newest",
            },
            {
              label: "Bounty",
              value: "bounty",
            },
          ]}
        />
      </div>
      {tickets.length ? tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />) : <Placeholder label="Tickets not found" />}
    </div>
  );
};
export default TicketList;
