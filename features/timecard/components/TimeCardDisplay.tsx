// features/timecard/components/TimeCardDisplay.tsx
"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  handleStartWork,
  handleEndWork,
} from "@/features/timecard/actions/timeCardAction";
import { Box, Flex, useToast } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";
import { toZonedTime } from "date-fns-tz";
import { useRouter } from "next/navigation";
import { TimeCard } from "@/features/timecard/types";

interface TimeCardDisplayProps {
  initialTimeCard: TimeCard | null;
  initialIsWorking: boolean;
  userId: string;
}

const TimeCardDisplay: React.FC<TimeCardDisplayProps> = ({
  initialTimeCard,
  initialIsWorking,
  userId,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [timeCard, setTimeCard] = useState<TimeCard | null>(initialTimeCard);
  const [isWorking, setIsWorking] = useState<boolean>(initialIsWorking);

  const formatDate = (date: Date) => {
    const zonedDate = toZonedTime(date, "Asia/Tokyo");
    return format(zonedDate, "yyyy/MM/dd", { locale: ja });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "未設定";
    const zonedDate = toZonedTime(date, "Asia/Tokyo");
    return format(zonedDate, "HH:mm:ss", { locale: ja });
  };

  const calculateWorkingHours = (
    startTime: Date | null,
    endTime: Date | null
  ) => {
    if (!startTime || !endTime) return "0.00";
    const diff = (endTime.getTime() - startTime.getTime()) / 3600000;
    return diff.toFixed(2);
  };

  const onStartWork = async () => {
    try {
      const result = await handleStartWork(userId);
      if (result.timeCard) {
        setTimeCard(result.timeCard);
        setIsWorking(true);
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "エラー",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  const onEndWork = async () => {
    try {
      const result = await handleEndWork(userId);
      if (result.timeCard) {
        setTimeCard(result.timeCard);
        setIsWorking(false);
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "エラー",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <Box>
      {timeCard ? (
        <div>
          <p>日付: {formatDate(timeCard.date)}</p>
          <p>出勤時間: {formatTime(timeCard.startTime)}</p>
          <p>退勤時間: {formatTime(timeCard.endTime)}</p>
          <p>
            勤務時間:{" "}
            {calculateWorkingHours(timeCard.startTime, timeCard.endTime)}時間
          </p>
        </div>
      ) : (
        <p>タイムカードが見つかりません。</p>
      )}
      <Flex justify="space-between" mt={4}>
        <CustomButton onClick={onStartWork} width="80px" isDisabled={isWorking}>
          {isWorking ? "勤務中" : "出勤"}
        </CustomButton>
        <CustomButton onClick={onEndWork} width="80px" isDisabled={!isWorking}>
          退勤
        </CustomButton>
      </Flex>
    </Box>
  );
};

export default TimeCardDisplay;
