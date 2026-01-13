"use client";
import { useAppSelector } from "@/store/hooks";
import { amountColorMap, formatCurrency, ILargeStatCard } from "@/utils";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import Card from "./Card";

const LargeStatCard = ({
  title = "Title Card",
  amount = 10000,
  icon = "",
  type = "EXPENSE",
  percentage = "10.1",
}: ILargeStatCard) => {
  const { code, locale } = useAppSelector((state) => state.currency);
  const { currency: currencyCode, showDecimals } = useAppSelector(
    (state) => state.settings
  );

  // Use the selected currency from settings, fallback to the one from currency state
  const displayCurrency = currencyCode || code;

  return (
    <Card>
      <div className="group absolute right-1 top-1 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-paper-background!">
        <ArrowUpRight className="text-gray-500 group-hover:text-secondary! group-hover:rotate-25  group-hover:scale-110 transition-all duration-200" />
      </div>
      <h3 className="text-md font-semibold text-gray-700 mb-5">{title}</h3>
      <p className={`text-3xl font-bold ${amountColorMap[type]}`}>
        {formatCurrency(amount, locale, displayCurrency, showDecimals)}
      </p>

      <div className="flex items-center gap-1 mt-3">
        <span className={`rounded-full px-2 py-1  text-xs flex gap-1  ${(Number(percentage) > 0) ? "bg-green-30 text-green-800" : "bg-red-50 text-red-800 "}`}>
          <span className="text-xs">
            {Number(percentage) > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </span>
          <span className="text-xs">
            {percentage}%
          </span>
        </span>
        <span className="text-xs text-gray-500">vs last month</span>
      </div>
    </Card>
  );
};

export default LargeStatCard;
