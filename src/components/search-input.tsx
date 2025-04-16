"use client";

import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};
const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  const handleChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  }, 300);

  return <Input placeholder={placeholder} defaultValue={value} onChange={handleChange} />;
};

export { SearchInput };
