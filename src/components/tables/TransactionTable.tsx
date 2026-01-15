import { useMemo } from 'react';
import { DataTable, type Column } from "../common/DataTable";
import moment from 'moment';
import { formatCurrency } from "@/utils";
import { useAppSelector } from "@/store/hooks";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onRowClick?: (transaction: Transaction) => void;
  className?: string;
}

// Helper function to get columns with dynamic currency formatting
const getColumns = (currencyCode: string, locale: string, showDecimals: boolean): Column<Transaction>[] => [
  {
    header: "Date",
    accessor: (transaction: Transaction) => moment(transaction.date).format('DD MMM YYYY, h:mm A'),
    className: "text-muted-foreground",
  },
 {
    header: "Description",
    accessor: "description",
    className: "font-medium",
  },
  {
    header: "Amount",
    accessor: (transaction: Transaction) => {
      // Use the currency code and locale from Redux
      return (
        <span className="font-semibold">
          {formatCurrency(transaction.amount, locale, currencyCode, showDecimals)}
        </span>
      );
    },
    // className: "text-right",
    // headerClassName: "text-right",
  },
   
  {
    header: "Category",
    accessor: "category",
    className: "capitalize",
  },
  {
    header: "Type",
    accessor: "type",
    className: "capitalize",
  },
];

export function TransactionTable({
  transactions,
  onRowClick,
  className,
}: TransactionTableProps) {

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
      data={transactions}
      keyField="id"
      onRowClick={onRowClick}
      className={className}
      rowClassName="hover:bg-purple-10 hover:text-purple-70"
      headerClassName="bg-muted/50 bg-purple-20 rounded-full! rounded!"
    />
  );
}
