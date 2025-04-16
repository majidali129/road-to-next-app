"use client";

import { SearchInput } from "@/components/search-input";
import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

type TicketSearchIputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchIputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  return <SearchInput placeholder={placeholder} value={search} onChange={setSearch} />;
};
export { TicketSearchInput };
