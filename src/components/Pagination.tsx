import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  setPage: (number: number) => void;
  noOfPage: number;
  page: number;
}

const PaginationBar = ({ noOfPage, setPage, page }: Props) => {
  const [activePage, setActivePage] = useState(0);

  return (
    <Pagination className="my-6">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem
          className="cursor-default"
          onClick={() => {
            if (page > 1) {
              setActivePage(activePage - 1);
              setPage(page - 1);
            }
          }}
        >
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: Math.ceil(noOfPage) }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                setActivePage(i);
                setPage(i + 1);
              }}
              isActive={i === activePage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem
          className="cursor-default"
          onClick={() => {
            if (page < noOfPage) {
              setActivePage(activePage + 1);
              setPage(page + 1);
            }
          }}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
