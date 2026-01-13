export type IAmountType = "EXPENSE" | "INCOME"|  "BALANCE" | "SAVING";
export type ILargeStatCard = {
  title?: string;
  amount?: number;
  type?: IAmountType;
  icon?: string;
  percentage?: string;
}



