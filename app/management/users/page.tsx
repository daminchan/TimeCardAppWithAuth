import { auth } from "@/auth";
import UserManagementPanel from "@/features/user-management/components/UserManagementPanel";
import { getUsersForAdmin } from "@/features/user-management/api/userManagementService";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import FlexCol from "@/components/ui/FlexCol";

import RestrictedAccessView from "@/components/status/RestrictedAccessView";
import NavButton from "@/components/navigation/NavButton";

export default async function ManagementPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    return (
      <RestrictedAccessView
        message="閲覧には管理者権限が必要です"
        linkText="ホーム"
        linkHref="/"
      />
    );
  }
  const users = await getUsersForAdmin();

  return (
    <FlexCol align="center" justify="center" p={10}>
      <Heading as="h1" size="xl">
        ユーザー管理
      </Heading>
      <UserManagementPanel users={users} />
      <Heading as="h1" size="xl">
        ユーザー登録
      </Heading>
      <NavButton href="/auth/sign-up" label="サインアップ" />
      <NavButton href="/" label="ホームに戻る" />
    </FlexCol>
  );
}
