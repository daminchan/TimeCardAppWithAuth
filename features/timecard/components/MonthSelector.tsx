import React from "react";
import { Select } from "@chakra-ui/react";
import { format } from "date-fns";

interface MonthSelectorProps {
  selectedMonth: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onChange,
}) => (
  <Select value={selectedMonth} onChange={onChange} width="200px">
    {Array.from({ length: 12 }, (_, i) => {
      const date = new Date(new Date().getFullYear(), i, 1);
      return (
        <option key={i} value={format(date, "yyyy-MM")}>
          {format(date, "yyyy年MM月")}
        </option>
      );
    })}
  </Select>
);
