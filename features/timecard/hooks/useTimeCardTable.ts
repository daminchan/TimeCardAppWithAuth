import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { TimeCard } from "../types";
import { calculateTotalHours } from "../utils/dateUtils";

export const useTimeCardTable = (timeCards: TimeCard[]) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );

  const filteredTimeCards = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    return timeCards
      .filter((card) => card.date >= startDate && card.date <= endDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [timeCards, selectedMonth]);

  const totalHours = calculateTotalHours(filteredTimeCards);

  return {
    selectedMonth,
    setSelectedMonth,
    filteredTimeCards,
    totalHours,
  };
};
