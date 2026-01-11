export type IAmountType = "EXPENSE" | "INCOME"|  "BALANCE";
export type ILargeStatCard = {
  title?: string;
  amount?: number;
  type?: IAmountType;
  icon?: string;
}



