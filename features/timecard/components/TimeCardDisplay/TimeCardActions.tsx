import React from "react";
import { Flex } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";

interface TimeCardActionsProps {
  isWorking: boolean;
  onStartWork: () => void;
  onEndWork: () => void;
}

const TimeCardActions: React.FC<TimeCardActionsProps> = ({
  isWorking,
  onStartWork,
  onEndWork,
}) => {
  return (
    <Flex justify="space-between" mt={4}>
      <CustomButton onClick={onStartWork} width="80px" isDisabled={isWorking}>
        {isWorking ? "勤務中" : "出勤"}
      </CustomButton>
      <CustomButton onClick={onEndWork} width="80px" isDisabled={!isWorking}>
        退勤
      </CustomButton>
    </Flex>
  );
};

export default TimeCardActions;
