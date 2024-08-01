// userを登録するページ
// 最終的に管理者ページのみの表示とする

import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import AuthSignUpForm from "@/features/auth/components/AuthSignUpForm";
import { Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <FlexCol minH="100vh" align="center" justify="center" py={6} gap={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        TOPページ
      </Heading>
      <AuthSignUpForm />
      <CustomButton width="200px">
        <Link href="/">ホーム</Link>
      </CustomButton>
    </FlexCol>
  );
}
