// pages/mypage.tsx
import { auth } from "@/auth";
import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { getTimeCard } from "@/features/timecard/api/timeCardService";
import TimeCardDisplay from "@/features/timecard/components/TimeCardDisplay";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { TimeCard } from "@/features/timecard/types";
import RestrictedAccessView from "@/components/status/RestrictedAccessView";
import NavButton from "@/components/navigation/NavButton";

export default async function MyPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <RestrictedAccessView
        message="閲覧にはログインが必要です"
        linkText="ログイン"
        linkHref="/login"
      />
    );
  }

  if (session.user.role !== "member" && session.user.role !== "admin") {
    return (
      <RestrictedAccessView
        message="閲覧には適切な権限が必要です"
        linkText="ホーム"
        linkHref="/"
      />
    );
  }

  const timeCard: TimeCard | null = await getTimeCard(session.user.id);
  const isWorking = timeCard !== null && timeCard.endTime === null;

  return (
    <FlexCol minH="100vh" align="center" justify="center" py={6}>
      <Heading as="h1" size="xl" textAlign="center">
        {session.user.name}ページ
      </Heading>
      <Box
        width="100%"
        maxW="400px"
        minW="400px"
        bg="gray.100"
        borderRadius="md"
        p={4}
      >
        <FlexCol gap={4}>
          <TimeCardDisplay
            initialTimeCard={timeCard}
            initialIsWorking={isWorking}
            userId={session.user.id}
          />
        </FlexCol>
      </Box>
      <NavButton href="/mypage/dashboard" label="ダッシュボード" />
      <NavButton href="/" label="ホームに戻る" />
    </FlexCol>
  );
}
