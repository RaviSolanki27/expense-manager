import { IAmountType } from "../types";

export const amountColorMap: Record<IAmountType, string> = {
  EXPENSE: "text-red-600",
  INCOME: "text-green-600",
  BALANCE: "text-blue-600",
  SAVING: "text-blue-600",
};

export const formatCurrency = (
  amount: number,
  locale: string,
  currency: string,
  showDecimals: boolean = true
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};
