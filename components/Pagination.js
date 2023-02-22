import { useMemo } from "react";
import classNames from "classnames";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const DOTS = "DOTS";

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
};

const usePagination = ({ pageCount, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= pageCount) {
      return range(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount + 1, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount + 1,
      pageCount - 1
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, pageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(pageCount - rightItemCount + 1, pageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, pageCount, currentPage]);

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
        "flex h-8 w-8 items-center justify-center rounded-sm border p-1 text-sm transition-colors disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800",
        active
          ? "border-transparent bg-blue-500/30 text-blue-600"
          : "border-slate-100 stroke-slate-900 hover:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:stroke-slate-600"
      )}
    />
  );
};

const Pagination = ({
  currentPage = 0,
  pageCount = 10,
  onPageChange = () => {},
  onPrev = () => {},
  onNext = () => {},
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    pageCount,
  });
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === pageCount - 1;

  if (pageCount === 1) return null;

  return (
    <div className={classNames("flex w-fit gap-1.5 sm:gap-2", className)}>
      <PaginationButton onClick={onPrev} disabled={isPrevDisabled}>
        <IconChevronLeft className="h-4 w-4 stroke-inherit" />
      </PaginationButton>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) return <Dots key={idx} />;
        return (
          <PaginationButton
            key={idx}
            onClick={() => onPageChange(pageNumber - 1)}
            active={currentPage === pageNumber - 1}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <PaginationButton onClick={onNext} disabled={isNextDisabled}>
        <IconChevronRight className="h-4 w-4 stroke-inherit" />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
