"use client";
import React from "react";
import { Heading } from "@chakra-ui/react";
import TimeCardTable from "./TimeCardTable";
import FlexCol from "@/components/ui/FlexCol";
import { TimeCard } from "../types";

import { useTimeCards } from "../hooks/useTimeCards";

interface TimeCardPanelProps {
  initialTimeCards: TimeCard[];
  userId: string;
}

const HOURLY_RATE = 1000; // 時給を定数として定義

const TimeCardPanel: React.FC<TimeCardPanelProps> = ({
  initialTimeCards,
  userId,
}) => {
  const { timeCards, updateTimeCards } = useTimeCards(initialTimeCards, userId);

  return (
    <FlexCol width="100%" align="center">
      <Heading as="h2" size="lg" mb={4}>
        タイムカード一覧
      </Heading>
      <TimeCardTable
        timeCards={timeCards}
        hourlyRate={HOURLY_RATE}
        userId={userId}
        onTimeCardsUpdate={updateTimeCards}
      />
    </FlexCol>
  );
};

export default TimeCardPanel;
