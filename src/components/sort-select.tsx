"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type SortSelectOption = { label: string; sortValue: string; sortKey: string };

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: (value: SortObject) => void;
  options: Array<SortSelectOption>;
};
const SortSelect = ({ options, onChange, value }: SortSelectProps) => {
  const handleChange = (compositKey: string) => {
    const [sortKey, sortValue] = compositKey.split("_");

    onChange({ sortKey, sortValue });
  };
  return (
    <Select onValueChange={handleChange} defaultValue={`${value.sortKey}_${value.sortValue}`}>
      <SelectTrigger className="!w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={`${option.sortKey}_${option.sortValue}`} value={`${option.sortKey}_${option.sortValue}`}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
