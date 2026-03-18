import { useState, useMemo } from "react";

interface Column<T, K extends keyof T = keyof T> {
  field?: K;
  header: string;
  render?: (value: T[K], row: T) => React.ReactNode;
  onClick?: (row: T) => void;
  buttonCaption?: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  rowKey?: (row: T) => string | number;
}

export function Grid<T extends object>({
  data,
  columns,
  pageSize = 5,
  rowKey,
}: GridProps<T>) {

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      columns
        .filter(c => c.field)
        .some(c => {
          const value = item[c.field as keyof T];
          return String(value)
            .toLowerCase()
            .includes(search.toLowerCase());
        })
    );
  }, [data, search, columns]);


  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const v1 = a[sortField];
      const v2 = b[sortField];

      if (typeof v1 === "string" && typeof v2 === "string") {
        return asc
          ? v1.localeCompare(v2)
          : v2.localeCompare(v1);
      }

      if (v1 < v2) return asc ? -1 : 1;
      if (v1 > v2) return asc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, asc]);


  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  return (
    <div>

      <div className="mb-4 flex justify-end items-center ">
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
        <thead className="bg-slate-900/70 uppercase text-sm">
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                className="px-6 py-4 cursor-pointer"
                onClick={() => {
                  if (!c.field) return;
                  setAsc(sortField === c.field ? !asc : true);
                  setSortField(c.field);
                }}
              >
                {c.header}
                {sortField === c.field && (asc ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, index) => (
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
                        className="px-3 py-1 border rounded"
                      >
                        {c.buttonCaption}
                      </button>
                    </td>
                  );
                }

                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 border rounded"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="px-3 py-1 border rounded"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}