// pages/mypage.tsx
import { auth } from "@/auth";
import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { getTimeCard } from "@/features/timecard/api/timeCardService";
import TimeCardDisplay from "@/features/timecard/components/TimeCardDisplay";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { TimeCard } from "@/features/timecard/types";

export default async function MyPage() {
  const session = await auth();
  if (!session || !session.user) {
    // セッションがない場合の処理（例：ログインページへのリダイレクト）
    return null;
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
      <Link href="/mypage/dashboard" passHref>
        <CustomButton as="span" width="200px">
          ダッシュボードページ
        </CustomButton>
      </Link>
      <Link href="/" passHref>
        <CustomButton as="span" width="200px">
          ホーム
        </CustomButton>
      </Link>
    </FlexCol>
  );
}
