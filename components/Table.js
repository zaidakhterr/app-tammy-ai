import classNames from "classnames";
import React from "react";
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
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(idx => {
                  return (
                    <tr key={idx}>
                      <td
                        className={classNames(
                          "w-full p-2 text-sm sm:p-3 md:text-base",
                          idx !== 0 && "border-t dark:border-slate-700"
                        )}
                      >
                        <div className="h-8 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
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
                          "cursor-pointer transition-colors hover:bg-slate-50/75 dark:hover:bg-slate-800/25"
                      )}
                    >
                      {row.getVisibleCells().map((cell, cellIdx) => {
                        return (
                          <td
                            key={cell.id}
                            className={classNames(
                              "p-2 text-sm sm:p-3 md:text-base",
                              idx !== 0 && "border-t dark:border-slate-700",
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
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
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
