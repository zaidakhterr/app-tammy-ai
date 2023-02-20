import { useMemo } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const DOTS = "DOTS";

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Dots = () => {
  return <span className="flex h-8 w-8 items-center justify-center">...</span>;
};

const PaginationButton = ({ active, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex h-8 w-8 items-center justify-center rounded border p-1 text-sm transition-colors disabled:cursor-not-allowed",
        active
          ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          : "hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      )}
    />
  );
};

const Pagination = ({
  currentPage = 1,
  totalCount = 100,
  pageSize = 10,
  onPageChange = () => {},
  onPrev = () => {},
  onNext = () => {},
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    totalCount,
  });
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPageCount;

  if (totalPageCount === 1) return null;

  return (
    <div className={classNames("flex w-fit gap-2", className)}>
      <PaginationButton onClick={onPrev} disabled={isPrevDisabled}>
        <ChevronLeftIcon className="h-4 w-4" />
      </PaginationButton>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) return <Dots key={idx} />;
        return (
          <PaginationButton
            key={idx}
            onClick={() => onPageChange(pageNumber)}
            active={currentPage === pageNumber}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <PaginationButton onClick={onNext} disabled={isNextDisabled}>
        <ChevronRightIcon className="h-4 w-4" />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
