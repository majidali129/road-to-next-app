import Placeholder from "@/components/placeholder";
import { getTickets } from "@/features/queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import TicketItem from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-select-sort";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metaData: ticketsMetadata } = await getTickets(userId, searchParams);

  return (
    <div className="flex flex-1 flex-col  gap-y-4 items-center animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "High Bounty",
            },
            {
              sortKey: "bounty",
              sortValue: "asc",
              label: "Low Bounty",
            },
          ]}
        />
      </div>
      {tickets.length ? tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />) : <Placeholder label="Tickets not found" />}
      <div className="w-full max-w-[420px]">
        <TicketPagination ticketPaginationMetadata={ticketsMetadata} />
      </div>
    </div>
  );
};
export default TicketList;
