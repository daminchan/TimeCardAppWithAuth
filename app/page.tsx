import { logout } from "@/features/auth/lib/authActions";
import { auth } from "@/auth";
import Link from "next/link";
import FlexCol from "@/components/ui/FlexCol";
import { Button, Heading } from "@chakra-ui/react";
import CustomButton from "@/components/ui/Button/CustomButton";

export default async function Home() {
  const session = await auth();

  return (
    <FlexCol minH="100vh" align="center" justify="center" py={6}>
      {session ? (
        <>
          <Heading as="h1" size="xl" textAlign="center">
            TOPページ
          </Heading>
          <FlexCol align="center" gap={4}>
            <Link href="/mypage">
              <CustomButton>マイページ</CustomButton>
            </Link>
            <Link href="/management/users">
              <CustomButton>管理ページ</CustomButton>
            </Link>
            <form action={logout}>
              <CustomButton type="submit">ログアウト</CustomButton>
            </form>
          </FlexCol>
        </>
      ) : (
        <>
          <Heading as="h1" size="xl" textAlign="center">
            勤務管理アプリ
          </Heading>
          <FlexCol align="center" gap={4}>
            <Link href="/auth/login">
              <CustomButton width="200px">ログイン</CustomButton>
            </Link>
          </FlexCol>
        </>
      )}
    </FlexCol>
  );
}
