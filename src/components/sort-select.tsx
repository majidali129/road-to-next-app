"use client";

import { sortParser } from "@/features/ticket/search-params";
import { useQueryState } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type SortSelectProps = {
  options: Array<{ label: string; value: string }>;
};
const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const handleChange = (value: string) => {
    setSort(value);
  };
  return (
    <Select onValueChange={handleChange} defaultValue={sort}>
      <SelectTrigger className="!w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
