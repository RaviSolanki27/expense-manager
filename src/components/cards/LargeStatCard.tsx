"use client"
import { useAppSelector } from "@/store/hooks";
import { amountColorMap, formatCurrency, ILargeStatCard } from "@/utils";

const LargeStatCard = ({
  title = "Title Card",
  amount = 10000,
  icon = "",
  type = "EXPENSE",
}: ILargeStatCard) => {

const { code, locale } = useAppSelector(
    (state) => state.currency
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${amountColorMap[type]}`}>
        {formatCurrency(amount, locale, code)}
      </p>
    </div>
  );
};

export default LargeStatCard;
