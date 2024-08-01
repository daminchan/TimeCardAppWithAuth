"use client";

import React from "react";
import { useToast, Box, Text, Flex } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { deleteTimeCard } from "../api/timeCardService";

interface TimeCardDeleteButtonProps {
  id: string;
  onDelete: () => void;
}

const TimeCardDeleteButton: React.FC<TimeCardDeleteButtonProps> = ({
  id,
  onDelete,
}) => {
  const toast = useToast();

  const handleDelete = async () => {
    toast({
      position: "top",
      duration: null,
      render: ({ onClose }) => (
        <Box color="white" p={3} bg="orange.500" borderRadius="md">
          <FlexCol gap={2}>
            <Text fontWeight="bold">タイムカードの削除</Text>
            <Text>このタイムカードを削除してもよろしいですか？</Text>
            <Flex justifyContent="flex-end" gap={2}>
              <CustomButton size="sm" onClick={onClose}>
                キャンセル
              </CustomButton>
              <CustomButton
                size="sm"
                colorScheme="red"
                onClick={async () => {
                  onClose();
                  try {
                    await deleteTimeCard(id);
                    toast({
                      title: "成功",
                      description: "タイムカードが削除されました。",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    onDelete(); // 親コンポーネントの更新関数を呼び出し
                  } catch (error) {
                    console.error("タイムカードの削除に失敗しました:", error);
                    toast({
                      title: "エラー",
                      description: "タイムカードの削除に失敗しました。",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
              >
                削除
              </CustomButton>
            </Flex>
          </FlexCol>
        </Box>
      ),
    });
  };

  return (
    <CustomButton colorScheme="red" size="sm" onClick={handleDelete}>
      削除
    </CustomButton>
  );
};

export default TimeCardDeleteButton;
