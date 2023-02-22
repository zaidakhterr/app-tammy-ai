import classNames from "classnames";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import Loader from "./Loader";

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
    const tableRef = React.useRef(null);
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
        if (tableRef.current) {
          tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
      },
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
    });

    return (
      <>
        <div className="relative mb-4 min-h-[4rem] w-full overflow-clip rounded-md border dark:border-slate-700">
          <table ref={tableRef} className="w-full scroll-m-20">
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
                            "p-3 text-sm md:text-base",
                            idx !== 0 && "border-t dark:border-slate-700",
                            cellIdx !== 0 && "hidden md:table-cell"
                          )}
                        >
                          <a>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </a>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-500/10 ">
              <Loader size={40} />
            </div>
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
