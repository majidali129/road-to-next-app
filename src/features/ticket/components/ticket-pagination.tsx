"use client";

import { Pagination } from "@/components/pagination";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { paginationOptions, paginationParser, searchParser } from "../search-params";

type TicketPaginationProps = {
  ticketPaginationMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};
const TicketPagination = ({ ticketPaginationMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);
  const [search] = useQueryState("search", searchParser);

  const prevSearch = useRef(search);

  useEffect(() => {
    if (prevSearch.current === search) return;
    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return <Pagination paginationMetadata={ticketPaginationMetadata} pagination={pagination} onPagination={setPagination} />;
};

export { TicketPagination };
