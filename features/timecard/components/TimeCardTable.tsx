"use client";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Tfoot, Flex } from "@chakra-ui/react";
import { TimeCard } from "../types";
import FlexCol from "@/components/ui/FlexCol";
import { useTimeCardTable } from "../hooks/useTimeCardTable";
import { MonthSelector } from "./MonthSelector";
import { DeleteMonthButton } from "./DeleteMonthButton";
import { TimeCardTableRow } from "./TimeCardTableRow";

interface TimeCardTableProps {
  timeCards: TimeCard[];
  hourlyRate: number;
  userId: string;
  onTimeCardsUpdate: () => void;
}

const TimeCardTable: React.FC<TimeCardTableProps> = ({
  timeCards,
  hourlyRate,
  userId,
  onTimeCardsUpdate,
}) => {
  const { selectedMonth, setSelectedMonth, filteredTimeCards, totalHours } =
    useTimeCardTable(timeCards);

  const totalEarnings = Math.ceil(totalHours * hourlyRate);

  return (
    <FlexCol>
      <Flex justifyContent="space-between">
        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th>出勤時間</Th>
            <Th>退勤時間</Th>
            <Th>合計時間</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTimeCards.map((card) => (
            <TimeCardTableRow
              key={card.id}
              card={card}
              onDelete={onTimeCardsUpdate}
            />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={3}>選択月の合計時間</Th>
            <Th>{totalHours.toFixed(2)} 時間</Th>
          </Tr>
          <Tr>
            <Th colSpan={3}>選択月の合計金額</Th>
            <Th>{totalEarnings} 円</Th>
          </Tr>
        </Tfoot>
      </Table>
      <DeleteMonthButton
        selectedMonth={selectedMonth}
        userId={userId}
        onTimeCardsUpdate={onTimeCardsUpdate}
      />
    </FlexCol>
  );
};

export default TimeCardTable;
