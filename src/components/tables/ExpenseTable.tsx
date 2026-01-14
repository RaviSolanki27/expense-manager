// src/components/tables/ExpenseTable.tsx
import { useMemo } from 'react';
import { DataTable, type Column } from "../common/DataTable";
import moment from 'moment';
import { formatCurrency } from "@/utils";
import { useAppSelector } from "@/store/hooks";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onRowClick?: (expense: Expense) => void;
  className?: string;
}

// Helper function to get columns with dynamic currency formatting
const getColumns = (currencyCode: string, locale: string, showDecimals: boolean): Column<Expense>[] => [
  {
    header: "Date",
    accessor: (expense: Expense) => moment(expense.date).format('DD MMM YYYY, h:mm A'),
    className: "text-muted-foreground",
  },
  {
    header: "Description",
    accessor: "description",
    className: "font-medium",
  },
  {
    header: "Amount",
    accessor: (expense: Expense) => {
      // Use the currency code and locale from Redux
      return (
        <span className="font-semibold">
          {formatCurrency(expense.amount, locale, currencyCode, showDecimals)}
        </span>
      );
    },
    className: "text-right",
    headerClassName: "text-right",
  },
  {
    header: "Category",
    accessor: "category",
    className: "capitalize",
  },
];

export function ExpenseTable({
  expenses,
  onRowClick,
  className,
}: ExpenseTableProps) {

  const { code: currencyCode, locale } = useAppSelector((state) => state.currency);
  const { showDecimals } = useAppSelector(
    (state) => state.settings
  );
  
  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => getColumns(currencyCode, locale, showDecimals),
    [currencyCode, locale, showDecimals]
  );

  return (
    <DataTable
      columns={columns}
      data={expenses}
      keyField="id"
      onRowClick={onRowClick}
      className={className}
      rowClassName="hover:bg-muted/50"
      headerClassName="bg-muted/50 bg-purple-20 rounded-full! rounded!"
    />
  );
}
