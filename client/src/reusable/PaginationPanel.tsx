import { Button } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Pagination } from "../models/Pagination";

type Props = {
  getPage: (page: number) => void;
  pagination: Pagination;
};

const PaginationPanel = ({ getPage, pagination }: Props) => {
  return (
    <FlexBetween gap="1rem" flexWrap="wrap">
      <Button
        variant="contained"
        onClick={() => getPage(pagination!.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      >
        {"<"}
      </Button>
      <FlexBetween gap="0.5rem" flexWrap="wrap">
        {Array.from({ length: pagination!.totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              variant="contained"
              onClick={() => getPage(pageNumber)}
              disabled={pagination.currentPage === pageNumber}
            >
              {pageNumber}
            </Button>
          )
        )}
      </FlexBetween>
      <Button
        variant="contained"
        onClick={() => getPage(pagination!.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        {">"}
      </Button>
    </FlexBetween>
  );
};

export default PaginationPanel;
