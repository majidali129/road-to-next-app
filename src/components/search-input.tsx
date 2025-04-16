"use client";

import { searchParser } from "@/features/ticket/search-params";
import { useQueryState } from "nuqs";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};
const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  const handleChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  }, 300);
  return <Input placeholder={placeholder} defaultValue={search} onChange={handleChange} />;
};

export { SearchInput };
