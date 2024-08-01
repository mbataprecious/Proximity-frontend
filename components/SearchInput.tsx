import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearchClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClear?: () => void;
  isClearable?: boolean;
}

const SearchInput = ({
  onSearchClick,
  isClearable,
  onClear,
  ...rest
}: SearchInputProps) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-2 pl-10 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
        placeholder="Search"
        {...rest}
        value={rest.value}
      />
      {!isClearable ? (
        <Button
          onClick={onSearchClick}
          className="absolute top-1/2 -translate-y-1/2 right-1 font-medium text-xs !rounded-[4px] py-[0.5rem] !px-2 max-[700px]:w-max"
        >
          Search
        </Button>
      ) : (
        <Button
          onClick={onClear}
          className="absolute top-1/2 -translate-y-1/2 right-1 font-medium text-xs !rounded-[4px] py-[0.5rem] !px-4"
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
