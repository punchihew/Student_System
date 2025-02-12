import React, { useEffect, useRef, useState } from "react";
import {
  carrotDownIcon,
  carrotUpIcon,
  chevronDownIcon,
  chevronUpIcon,
} from "../data";

// Define the types for the column and row data
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  format?: (row: any, value: any) => JSX.Element | string;
}

interface DataTableProps {
  isLoading: boolean; // For initial data loading
  columns: Column[];
  data: any[];
  sortDirection: "asc" | "desc";
  sortKey: string;
  perPage?: number;
  onSortChanged: (key: string, direction: "asc" | "desc") => void;
  loadMoreData: () => void; // Function to load more data
  isLoadingMore?: boolean; // For loading more data
  tableHeadingTextSize?: string;
  textSize?: string;
  selectable?: boolean; // Enable selection functionality
  onSelectionChange?: (selectedRows: any[]) => void; // Callback for selected rows
}

const Enums = {
  SORT_DIRECTION_ASC: "asc" as const,
  SORT_DIRECTION_DESC: "desc" as const,
};

const DataTable: React.FC<DataTableProps> = ({
  isLoading,
  columns,
  data,
  sortDirection,
  sortKey,
  perPage = 10,
  onSortChanged,
  loadMoreData,
  isLoadingMore,
  tableHeadingTextSize = "text-base",
  textSize = "text-base",
  selectable = false,
  onSelectionChange,
}) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // Track selected rows

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreData();
      }
    }
  };

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (tableElement) {
        tableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoadingMore, isLoading]);

  const handleSort = (col: Column) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      onSortChanged(
        col.key,
        sortDirection === Enums.SORT_DIRECTION_ASC
          ? Enums.SORT_DIRECTION_DESC
          : Enums.SORT_DIRECTION_ASC
      );
    } else {
      onSortChanged(col.key, Enums.SORT_DIRECTION_ASC);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(data); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const handleSelectRow = (
    row: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, row]); // Add row to selected rows
    } else {
      setSelectedRows((prevSelected) => prevSelected.filter((r) => r !== row)); // Remove row from selected rows
    }
  };

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === Enums.SORT_DIRECTION_ASC ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === Enums.SORT_DIRECTION_ASC ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  // Trigger callback for selected rows if provided
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  return (
    <div className="w-full flex flex-col text-[#292929]">
      <div ref={tableRef} className="w-full overflow-x-auto">
        <table
          className="min-w-full table-auto"
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <thead className="rounded-md w-full sticky -top-[0px] z-[10]">
            <tr className="bg-[#efefef] rounded-md">
              {selectable && (
                <th style={{ width: "5%" }} className="p-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length} // Check "select all" if all rows are selected
                    className="cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col)}>
                  <button className="flex flex-row justify-between items-center gap-x-2 p-4">
                    <p className={`m-0 ${tableHeadingTextSize}`}>{col.label}</p>
                    {col.sortable && (
                      <div className="flex flex-col">
                        {col.key === sortKey && (
                          <>
                            {sortDirection === Enums.SORT_DIRECTION_ASC ? (
                              <img
                                src={carrotUpIcon}
                                alt="icon"
                                className="size-[16px]"
                              />
                            ) : (
                              <img
                                src={carrotDownIcon}
                                alt="icon"
                                className="size-[16px]"
                              />
                            )}
                            {sortDirection === Enums.SORT_DIRECTION_DESC ? (
                              <img
                                src={chevronUpIcon}
                                alt="icon"
                                className="size-[16px]"
                              />
                            ) : (
                              <img
                                src={chevronDownIcon}
                                alt="icon"
                                className="size-[16px]"
                              />
                            )}
                          </>
                        )}
                        {col.key !== sortKey && (
                          <>
                            <img
                              src={carrotUpIcon}
                              alt="icon"
                              className="size-[16px]"
                            />
                            <img
                              src={carrotDownIcon}
                              alt="icon"
                              className="size-[16px]"
                            />
                          </>
                        )}
                      </div>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              sortedData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b-[2px] border-b-gray-300 ${textSize}`}
                >
                  {selectable && (
                    <td className="p-3 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={(e) => handleSelectRow(row, e)}
                        className="cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} width={col.width} className="p-3">
                      {col.format
                        ? col.format(row, row[col.key])
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            {isLoading && (
              <>
                {Array.from({ length: perPage }).map((_, index) => (
                  <tr key={index} className="border-b-[2px] border-b-gray-300">
                    {columns.map((col) => (
                      <td key={col.key} width={col.width} className="p-4">
                        <div className="animate-pulse bg-gray-200 h-5 full rounded-md"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
            {isLoadingMore && (
              <>
                <tr className="border-b-[2px] border-b-gray-300">
                  {columns.map((col) => (
                    <td key={col.key} width={col.width} className="p-4">
                      <div className="animate-pulse bg-gray-200 h-5 full rounded-md"></div>
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { DataTable, Enums };
