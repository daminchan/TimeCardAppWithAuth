import React from "react";
import { TimeCard } from "../../types";
import {
  calculateWorkingHours,
  formatDate,
  formatTime,
} from "../../utils/dateUtils";

interface TimeCardInfoProps {
  timeCard: TimeCard | null;
}

const TimeCardInfo: React.FC<TimeCardInfoProps> = ({ timeCard }) => {
  if (!timeCard) {
    return <p>タイムカードが見つかりません。</p>;
  }

  return (
    <div>
      <p>日付: {formatDate(timeCard.date)}</p>
      <p>出勤時間: {formatTime(timeCard.startTime)}</p>
      <p>退勤時間: {formatTime(timeCard.endTime)}</p>
      <p>{calculateWorkingHours(timeCard.startTime, timeCard.endTime)}時間</p>
    </div>
  );
};

export default TimeCardInfo;
