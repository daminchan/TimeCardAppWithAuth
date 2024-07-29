import { auth } from "@/auth";
import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default async function MyPage() {
  const session = await auth();

  return (
    <FlexCol minH="100vh" align="center" justify="center" py={6} gap={4}>
      <Heading as="h1" size="xl" textAlign="center">
        マイページ
      </Heading>
      <Box width="100%" maxW="600px" bg="gray.100" borderRadius="md" p={4}>
        <Flex direction="column">
          <Box bg="gray.200" borderTopRadius="md" px={2} py={1.5} fontSize="sm">
            ユーザー情報
          </Box>
          <Box bg="white" borderBottomRadius="md" p={2}>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </Box>
        </Flex>
      </Box>
      <Link href="/">
        <CustomButton colorScheme="green" width="200px">
          ホーム
        </CustomButton>
      </Link>
    </FlexCol>
  );
}
