import { useState, useMemo } from "react";

interface Column<T, K extends keyof T = keyof T> {
  field?: K;
  header: string;
  render?: (value: T[K], row: T) => React.ReactNode;
  onClick?: (row: T) => void;
  buttonCaption?: string;
  filter?: boolean;
  filterPlaceholder?: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  rowKey?: (row: T) => string | number;
  loading?: boolean;
}

export function Grid<T extends object>({
  data,
  columns,
  pageSize = 5,
  rowKey,
  loading = false,
}: GridProps<T>) {
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const globalMatch = columns
        .filter((c) => c.field)
        .some((c) => {
          const value = item[c.field as keyof T];
          return String(value).toLowerCase().includes(search.toLowerCase());
        });

      const columnMatch = columns.every((c) => {
        if (!c.field || !columnFilters[c.field as string]) return true;

        const value = item[c.field];
        return String(value)
          .toLowerCase()
          .includes(columnFilters[c.field as string].toLowerCase());
      });

      return globalMatch && columnMatch;
    });
  }, [data, search, columnFilters, columns]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const v1 = a[sortField];
      const v2 = b[sortField];

      if (typeof v1 === "string" && typeof v2 === "string") {
        return asc ? v1.localeCompare(v2) : v2.localeCompare(v1);
      }

      if (v1! < v2!) return asc ? -1 : 1;
      if (v1! > v2!) return asc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, asc]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded bg-slate-800 border border-slate-600 text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="w-full text-left text-slate-300">
        <thead className="bg-slate-900/70 text-sm uppercase">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="px-6 py-3">
                <div className="flex flex-col gap-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      if (!c.field) return;
                      setAsc(sortField === c.field ? !asc : true);
                      setSortField(c.field);
                    }}
                  >
                    {c.header}
                    {sortField === c.field && (asc ? " ↑" : " ↓")}
                  </span>

                  {c.filter && c.field && (
                    <input
                      type="text"
                      placeholder={c.filterPlaceholder || "Filter..."}
                      className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs"
                      value={columnFilters[c.field as string] || ""}
                      onChange={(e) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [c.field as string]: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-slate-400"
              >
                No data found.
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr
                key={rowKey ? rowKey(item) : index}
                className={`
                  border-b border-slate-700/50
                  ${index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"}
                  hover:bg-slate-700/40
                `}
              >
                {columns.map((c, i) => {
                  if (c.render && c.field) {
                    return (
                      <td key={i} className="px-6 py-4">
                        {c.render(item[c.field], item)}
                      </td>
                    );
                  }

                  if (c.field) {
                    return (
                      <td key={i} className="px-6 py-4">
                        {String(item[c.field])}
                      </td>
                    );
                  }

                  if (c.onClick) {
                    return (
                      <td key={i} className="px-6 py-4">
                        <button
                          onClick={() => c.onClick?.(item)}
                          className="px-3 py-1 border border-slate-500 rounded hover:bg-slate-700"
                        >
                          {c.buttonCaption}
                        </button>
                      </td>
                    );
                  }

                  return null;
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40">
          <span className="text-white">Loading...</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 flex-wrap gap-2">

        <div className="flex items-center gap-2 text-slate-400">
          <span>Rows:</span>
          <select
            className="bg-slate-800 text-white border border-slate-600 px-2 py-1 rounded"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <span className="text-slate-400 text-sm">
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </span>

        <div className="flex items-center gap-4">
          <button
            className="px-3 py-1 border border-slate-500 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="text-slate-400">
            Page {page} of {totalPages || 1}
          </span>

          <button
            className="px-3 py-1 border border-slate-500 rounded disabled:opacity-50"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}