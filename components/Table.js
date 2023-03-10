import React from "react";
import classNames from "classnames";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "./Pagination";

const Table = React.memo(
  ({
    columns: _columns,
    data: _data,
    pageCount: _pageCount,
    pagination: _pagination,
    setPagination,
    onRowClick,
    loading,
  }) => {
    const containerRef = React.useRef(null);
    const columns = React.useMemo(() => _columns, [_columns]);
    const defaultData = React.useMemo(() => [], []);
    const data = React.useMemo(() => _data, [_data]);
    const pageCount = React.useMemo(() => _pageCount, [_pageCount]);

    const pagination = React.useMemo(
      () => ({
        pageIndex: _pagination?.pageIndex,
        pageSize: _pagination?.pageSize,
      }),
      [_pagination]
    );
    const table = useReactTable({
      data: data ?? defaultData,
      columns,
      pageCount: pageCount ?? -1,
      state: {
        pagination,
      },
      onPaginationChange: (...args) => {
        setPagination(...args);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
    });

    return (
      <>
        <div ref={containerRef} className="relative mb-4 min-h-[4rem] w-full">
          {loading ? (
            <table className="w-full">
              <tbody>
                {Array.from({
                  length: pagination.pageSize,
                }).map((_, idx) => {
                  return (
                    <tr key={idx}>
                      <td
                        className={classNames(
                          "w-full p-2 text-sm sm:p-3 md:text-base",
                          idx !== 0 && "border-t dark:border-neutral-700"
                        )}
                      >
                        <div className="h-8 w-full animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <tbody>
                {table.getRowModel().rows.map((row, idx) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={e => {
                        e.stopPropagation();
                        onRowClick && onRowClick(row);
                      }}
                      className={classNames(
                        "group",
                        onRowClick &&
                          "cursor-pointer transition-colors hover:bg-neutral-50/75 dark:hover:bg-neutral-800/25"
                      )}
                    >
                      {row.getVisibleCells().map((cell, cellIdx) => {
                        return (
                          <td
                            key={cell.id}
                            className={classNames(
                              "p-2 text-sm sm:p-3 md:text-base",
                              idx !== 0 && "border-t dark:border-neutral-700",
                              cellIdx !== 0 && "hidden md:table-cell"
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col-reverse items-end gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          {pageCount > 1 && (
            <select
              className="flex h-8 items-center justify-center rounded-sm border border-neutral-100 bg-transparent bg-right stroke-neutral-900 p-1 pr-6 text-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:stroke-neutral-400 dark:border-neutral-800 dark:stroke-white dark:hover:bg-neutral-800 dark:disabled:bg-neutral-800 dark:disabled:stroke-neutral-600"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 75, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          )}
          <Pagination
            currentPage={pagination.pageIndex}
            pageCount={pageCount}
            onPageChange={table.setPageIndex}
            onPrev={table.previousPage}
            onNext={table.nextPage}
          />
        </div>
      </>
    );
  }
);

Table.displayName = "Table";

export default Table;
