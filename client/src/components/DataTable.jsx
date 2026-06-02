import { useMemo, useState } from "react";

function DataTable({
  columns,
  data = [],
  searchable = false,
  sortable = false,
  paginated = false,
  pageSize = 10,
}) {
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState(null);

  const [sortDirection, setSortDirection] = useState("asc");

  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchable || !search.trim()) {
      return data;
    }

    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, searchable]);

  const sortedData = useMemo(() => {
    if (!sortable || !sortField) {
      return filteredData;
    }

    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sorted;
  }, [filteredData, sortable, sortField, sortDirection]);

  const totalPages = paginated
    ? Math.max(1, Math.ceil(sortedData.length / pageSize))
    : 1;

  const paginatedData = useMemo(() => {
    if (!paginated) {
      return sortedData;
    }

    const start = (page - 1) * pageSize;

    const end = start + pageSize;

    return sortedData.slice(start, end);
  }, [sortedData, page, pageSize, paginated]);

  const handleSort = (field) => {
    if (!sortable) return;

    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <>
      {searchable && (
        <>
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            className="data-table__search"
          />

          <br />
        </>
      )}

      <div className="data-table__wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{ cursor: sortable ? "pointer" : "default" }}
                >
                  {column.title}

                  {sortable &&
                    sortField === column.key &&
                    (sortDirection === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr className="data-table__empty">
                <td colSpan={columns.length}>Sin registros</td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowKey =
                  row.id ??
                  row.CATEGORIA_ID ??
                  row.CLIENTE_ID ??
                  row.AGENTE_ID ??
                  row.TICKET_ID ??
                  rowIndex;

                return (
                  <tr key={rowKey}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="data-table__pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}

export default DataTable;
