"use client";
import { useState } from "react";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import { User } from "../types";
import { Box } from "@chakra-ui/react";
import FlexCol from "@/components/ui/FlexCol";

interface UserManagementPanelProps {
  users: User[];
}

export default function UserManagementPanel({
  users,
}: UserManagementPanelProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <FlexCol>
      <UserList users={users} onSelectUser={setSelectedUser} />

      <Box flex={1}>{selectedUser && <UserDetails user={selectedUser} />}</Box>
    </FlexCol>
  );
}
