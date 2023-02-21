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
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
    });

    return (
      <>
        <div className="mb-4 w-full overflow-clip rounded-md border dark:border-slate-700">
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
                    className="group"
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className={classNames(
                            "p-3 text-sm md:text-base",
                            idx !== 0 && "border-t dark:border-slate-700",
                            onRowClick &&
                              "cursor-pointer transition-colors group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50"
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
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          {loading && <Loader />}
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
