import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type PageAndSize = {
  page: number;
  size: number;
};
type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginationMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const Pagination = ({ pagination, onPagination, paginationMetadata: { count, hasNextPage } }: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const handlePrevPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };
  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };
  const handleChangePageSize = (size: string) => {
    onPagination({ page: 0, size: parseInt(size) });
  };

  const prevButton = (
    <Button disabled={pagination.page < 1} onClick={handlePrevPage} size="sm" variant="outline">
      Previous
    </Button>
  );
  const nextButton = (
    <Button disabled={!hasNextPage} onClick={handleNextPage} size="sm" variant="outline">
      Next
    </Button>
  );

  const sizeButton = (
    <Select defaultValue={pagination.size.toString()} onValueChange={handleChangePageSize}>
      <SelectTrigger className=" !h-[33px] !bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-2">
        {sizeButton}
        {prevButton}
        {nextButton}
      </div>
    </div>
  );
};
export { Pagination };
