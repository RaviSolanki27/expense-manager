"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, Filter, Plus } from "lucide-react";
import { TransactionTable } from "@/components/tables/TransactionTable";
import IconButton from "@/components/Buttons/IconButton";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchTransactions,
  selectAllTransactions,
  selectPagination,
  selectFilters,
  setFilters,
  setPage,
  selectTransactionStatus,
  selectTransactionError,
} from "@/features/transactions/transactionsSlice";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: string;
  category?: string;
  date: string;
  accountId: string;
  userId: string;
  account: {
    id: string;
    name: string;
    type: string;
  };
};

const TransactionsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(selectAllTransactions);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectTransactionStatus);
  const error = useSelector(selectTransactionError);

  // Fetch transactions when filters or pagination changes
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, filters, pagination.page, pagination.limit]);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const clearFilters = () => {
    dispatch(setFilters({
      type: "",
      accountId: "",
      startDate: "",
      endDate: "",
      category: "",
    }));
  };

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">
          {error || 'Error loading transactions. Please try again.'}
        </p>
      </div>
    );
  }

  return (
    <div className=" mx-auto ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your transactions
          </p>
        </div> */}
        {/* <div className="flex gap-2">
          <IconButton
            label="Export"
            frontIcon={<Download className="mr-2 h-4 w-4" />}
          />
          <IconButton label="Add Transaction" frontIcon={<Plus className="mr-2 h-4 w-4" />} />
        </div> */}
      </div>

      <div className="rounded-lg ">
        {/* <div className="p-4 "> */}
          {/* <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <IconButton 
            label="Clear Filters" 
            frontIcon={<Filter className="mr-2 h-4 w-4" />}
            onClick={clearFilters}
          />
          </div> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                <SelectItem value={TransactionType.TRANSFER}>
                  Transfer
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Search by category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            />

            <DatePicker
              placeholder="Start Date"
              value={
                filters.startDate ? new Date(filters.startDate) : undefined
              }
              onChange={(date) =>
                handleFilterChange("startDate", date?.toISOString() || "")
              }
            />

            <DatePicker
              placeholder="End Date"
              value={filters.endDate ? new Date(filters.endDate) : undefined}
              onChange={(date) =>
                handleFilterChange("endDate", date?.toISOString() || "")
              }
            />
          </div> */}
        </div>

        <div className="">
          {status === 'loading' ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <p key={i}>Loading...</p>
                // <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <>
              <TransactionTable transactions={transactions} />

              {/* <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {pagination.total}
                  </span>{" "}
                  transactions
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1 || status === 'loading'}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={
                      pagination.page >= pagination.totalPages || status === 'loading'
                    }
                  >
                    Next
                  </button>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    // </div>
  );
};

export default TransactionsPage;
