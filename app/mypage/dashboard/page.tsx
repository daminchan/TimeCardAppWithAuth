import { auth } from "@/auth";
import NavButton from "@/components/navigation/NavButton";

import RestrictedAccessView from "@/components/status/RestrictedAccessView";

import FlexCol from "@/components/ui/FlexCol";
import { getUserTimeCards } from "@/features/timecard/api/timeCardService";
import TimeCardPanel from "@/features/timecard/components/TimeCardPanel";
import { Heading, Box } from "@chakra-ui/react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <RestrictedAccessView />;
  }

  const timeCards = await getUserTimeCards(session.user.id);

  return (
    <FlexCol py={6} align="center" justify="center" minH="100vh">
      <Heading>ダッシュボード</Heading>
      <Box width="100%" maxW="400px" minW="400px">
        <TimeCardPanel initialTimeCards={timeCards} userId={session.user.id} />
      </Box>
      <NavButton href="/" label="ホームに戻る" />
    </FlexCol>
  );
}
