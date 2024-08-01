import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";

interface DeleteConfirmToastProps {
  year: number;
  month: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmToast: React.FC<DeleteConfirmToastProps> = ({
  year,
  month,
  onCancel,
  onConfirm,
}) => (
  <Box color="white" p={3} bg="orange.500" borderRadius="md">
    <FlexCol gap={2}>
      <Text fontWeight="bold">月のデータを削除</Text>
      <Text>{`${year}年${month}月のデータを削除してもよろしいですか？`}</Text>
      <Flex justifyContent="flex-end" gap={2}>
        <CustomButton size="sm" onClick={onCancel}>
          キャンセル
        </CustomButton>
        <CustomButton size="sm" colorScheme="red" onClick={onConfirm}>
          削除
        </CustomButton>
      </Flex>
    </FlexCol>
  </Box>
);
