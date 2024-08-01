import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { format, toZonedTime } from "date-fns-tz";
import { ja } from "date-fns/locale";
import { TimeCard } from "../types";
import TimeCardDeleteButton from "./TimeCardDeleteButton";
import { formatTime, calculateWorkingHours } from "../utils/dateUtils";
interface TimeCardTableRowProps {
  card: TimeCard;
  onDelete: () => void;
}

export const TimeCardTableRow: React.FC<TimeCardTableRowProps> = ({
  card,
  onDelete,
}) => {
  return (
    <Tr>
      <Td>
        {format(toZonedTime(card.date, "Asia/Tokyo"), "yyyy/MM/dd", {
          locale: ja,
        })}
      </Td>
      <Td>{formatTime(card.startTime)}</Td>
      <Td>{formatTime(card.endTime)}</Td>
      <Td>{calculateWorkingHours(card.startTime, card.endTime)} 時間</Td>
      <Td>
        <TimeCardDeleteButton id={card.id} onDelete={onDelete} />
      </Td>
    </Tr>
  );
};
