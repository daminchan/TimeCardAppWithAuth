import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TimeCard } from "../types";
import { handleEndWork, handleStartWork } from "../actions/timeCardAction";

export const useTimeCard = (
  initialTimeCard: TimeCard | null,
  initialIsWorking: boolean,
  userId: string
) => {
  const toast = useToast();
  const router = useRouter();
  const [timeCard, setTimeCard] = useState<TimeCard | null>(initialTimeCard);
  const [isWorking, setIsWorking] = useState<boolean>(initialIsWorking);

  const onStartWork = async () => {
    try {
      const result = await handleStartWork(userId);
      if (result.timeCard) {
        setTimeCard(result.timeCard);
        setIsWorking(true);
      }
      router.refresh();
    } catch (error) {
      handleError(error, "出勤処理中にエラーが発生しました");
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
      handleError(error, "退勤処理中にエラーが発生しました");
    }
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    const errorMessage =
      error instanceof Error ? error.message : defaultMessage;
    toast({
      title: "エラー",
      description: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    console.error(errorMessage);
  };

  return { timeCard, isWorking, onStartWork, onEndWork };
};
