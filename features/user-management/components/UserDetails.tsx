"use client";
import { useState } from "react";
import { User } from "../types";
import { handleUpdateUserRole } from "../actions/userManagementActions";
import {
  Box,
  Heading,
  Text,
  Select,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface UserDetailsProps {
  user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
  const [role, setRole] = useState(user.role);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    await handleUpdateUserRole(user.id, newRole);
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        ユーザー詳細
      </Heading>
      <VStack align="stretch" spacing={3}>
        <Text>
          <strong>名前:</strong> {user.name}
        </Text>
        <Text>
          <strong>メールアドレス:</strong> {user.email}
        </Text>
        <Text>
          <strong>ID:</strong> {user.id}
        </Text>
        <FormControl>
          <FormLabel>
            <strong>役割:</strong>
          </FormLabel>
          <Select value={role} onChange={handleRoleChange}>
            <option value="user">一般ユーザー</option>
            <option value="admin">管理者</option>
          </Select>
        </FormControl>
      </VStack>
    </Box>
  );
}
