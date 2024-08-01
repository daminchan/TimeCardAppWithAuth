import CustomButton from "@/components/ui/Button/CustomButton";
import { handleDeleteUser } from "../actions/userManagementActions";
import { User } from "../types";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export default function UserList({ users, onSelectUser }: UserListProps) {
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>名前</Th>
            <Th>メールアドレス</Th>
            <Th>役割</Th>
            <Th>ロール</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>

              <Td>
                <CustomButton
                  colorScheme="blue"
                  size="sm"
                  onClick={() => onSelectUser(user)}
                >
                  詳細
                </CustomButton>
              </Td>
              <Td>
                <CustomButton
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  削除
                </CustomButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
