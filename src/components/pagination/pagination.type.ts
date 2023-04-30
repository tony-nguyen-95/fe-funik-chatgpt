export interface IPaginationProps {
  itemsCount: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  alwaysShown: boolean;
}
