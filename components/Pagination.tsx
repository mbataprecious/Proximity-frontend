import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface BreakAriaLabels {
  forward: string;
  backward: string;
}

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (page: number) => void;
  breakLabel?: string;
  breakAriaLabels?: BreakAriaLabels;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  pageRangeDisplayed,
  marginPagesDisplayed,
  onPageChange,
  breakLabel = "...",
  breakAriaLabels = { forward: "...", backward: "..." },
}) => {
  const [selected, setSelected] = useState<number>((currentPage ?? 1) - 1 || 0);

  const handlePageClick = (index: number) => {
    setSelected(index);
    onPageChange(index + 1);
  };

  const handleBreakClick = (index: number) => {
    const newSelected = index > selected ? selected + 1 : selected - 1;
    setSelected(newSelected);
    onPageChange(newSelected);
  };

  const getPageElement = (index: number) => (
    <span
      key={index}
      aria-current={selected === index ? "page" : undefined}
      className={`relative inline-flex items-center px-4 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
        selected === index
          ? "z-10 bg-blue-100 text-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          : "text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
      }`}
      onClick={() => handlePageClick(index)}
    >
      {index + 1}
    </span>
  );

  const pagination = () => {
    const items: JSX.Element[] = [];
    let leftSide = Math.floor(pageRangeDisplayed / 2);
    let rightSide = pageRangeDisplayed - leftSide;

    if (selected > pageCount - Math.ceil(pageRangeDisplayed / 2)) {
      rightSide = pageCount - selected;
      leftSide = pageRangeDisplayed - rightSide;
    } else if (selected < Math.ceil(pageRangeDisplayed / 2)) {
      leftSide = selected;
      rightSide = pageRangeDisplayed - leftSide;
    }

    let createPageView = (index: number) => getPageElement(index);
    let breakView: JSX.Element | null = null;

    for (let index = 0; index < pageCount; index++) {
      const page = index + 1;

      if (page <= marginPagesDisplayed) {
        items.push(createPageView(index));
        continue;
      }

      if (page > pageCount - marginPagesDisplayed) {
        items.push(createPageView(index));
        continue;
      }

      const adjustedRightSide =
        selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

      if (
        index >= selected - leftSide &&
        index <= selected + adjustedRightSide
      ) {
        items.push(createPageView(index));
        continue;
      }

      if (
        breakLabel &&
        items[items.length - 1] !== breakView &&
        (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
      ) {
        const useBreakAriaLabel =
          index < selected ? breakAriaLabels.backward : breakAriaLabels.forward;
        breakView = (
          <span
            key={index}
            className="relative inline-flex items-center px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            aria-label={useBreakAriaLabel}
            onClick={() => handleBreakClick(index)}
          >
            {breakLabel}
          </span>
        );
        items.push(breakView);
      }
    }

    return items;
  };

  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <span
          className={`relative inline-flex items-center rounded-l-md px-2 py-3 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            selected > 0
              ? "text-gray- cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handlePageClick(selected > 0 ? selected - 1 : 0)}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        {pagination()}
        <span
          className={`relative inline-flex items-center rounded-r-md px-2 py-3 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            selected < pageCount - 1
              ? "text-gray-700 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() =>
            handlePageClick(
              selected < pageCount - 1 ? selected + 1 : pageCount - 1
            )
          }
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </nav>
    </div>
  );
};

export default Pagination;
