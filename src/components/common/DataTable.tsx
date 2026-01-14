// src/components/common/DataTable.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

// Define column type
export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}

// Define props
interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyField,
  className = '',
  headerClassName = 'bg-muted/50',
  rowClassName = 'hover:bg-muted/50',
  cellClassName = 'px-4 py-3',
  emptyMessage = 'No data available',
  onRowClick,
}: DataTableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return String(item[column.accessor as keyof T] || '');
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="w-full overflow-auto">
        <table className={twMerge('w-full caption-bottom text-sm border-separate border-spacing-y-2', className)}>
          <thead >
            <tr className="[&>th]:bg-purple-10 [&>th:first-child]:rounded-l-full [&>th:last-child]:rounded-r-full">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={twMerge(
                    'h-10 px-6 text-left align-middle font-medium text-muted-foreground bg-purple-10! text-purple-70',
                    column.headerClassName,
                    index === 0 ? 'rounded-l-full' : '',
                    index === columns.length - 1 ? 'rounded-r-full' : ''
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr
                  key={String(item[keyField])}
                  className={twMerge(
                    'group',
                    onRowClick && 'cursor-pointer text-gray-500 hover:bg-purple-20',
                    rowClassName
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={twMerge(
                        'p-2! px-3! align-middle',
                        colIndex === columns.length - 1 ? 'rounded-r-full' : '',
                        colIndex === 0 ? 'rounded-l-full' : '',
                        column.className,
                        column.cellClassName,
                        cellClassName
                      )}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}