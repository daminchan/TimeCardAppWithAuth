import React from "react";
import { useToast } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";
import { handleDeleteMonthTimeCards } from "../actions/timeCardAction";
import { DeleteConfirmToast } from "./DeleteConfirmToast";

interface DeleteMonthButtonProps {
  selectedMonth: string;
  userId: string;
  onTimeCardsUpdate: () => void;
}

export const DeleteMonthButton: React.FC<DeleteMonthButtonProps> = ({
  selectedMonth,
  userId,
  onTimeCardsUpdate,
}) => {
  const toast = useToast();

  const handleDeleteMonth = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    toast({
      position: "top",
      duration: null,
      render: ({ onClose }) => (
        <DeleteConfirmToast
          year={year}
          month={month}
          onCancel={onClose}
          onConfirm={async () => {
            onClose();
            const result = await handleDeleteMonthTimeCards(
              startDate,
              endDate,
              userId
            );
            if (result.success) {
              toast({
                title: "成功",
                description: `${result.deletedCount}件のデータを削除しました。`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              onTimeCardsUpdate();
            } else {
              toast({
                title: "エラー",
                description: "データの削除に失敗しました。",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        />
      ),
      isClosable: true,
      id: "delete-confirm",
    });
  };

  return (
    <CustomButton onClick={handleDeleteMonth} colorScheme="red" mt={4}>
      選択月のデータを削除
    </CustomButton>
  );
};
