"use client";

import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { login } from "@/features/auth/lib/authActions";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";

export default function AuthLoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <form action={dispatch} style={{ width: "100%" }}>
      <Box width="100%" borderRadius="lg" bg="gray.50" p={6}>
        <FlexCol align="stretch" gap={4}>
          <FormControl>
            <FormLabel htmlFor="email" color="gray.800">
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレス"
              required
              border="1px"
              borderColor="gray.200"
              _placeholder={{ color: "gray.400" }}
              color="gray.700" // 通常時の文字色
              _focus={{ color: "black" }}
              pl={2}
              py={2}
              borderRadius="md"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" color="gray.800">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="パスワード"
              required
              border="1px"
              borderColor="gray.200"
              color="gray.700" // 通常時の文字色
              _placeholder={{ color: "gray.400" }}
              _focus={{ color: "black" }}
              pl={2}
              py={2}
              borderRadius="md"
            />
          </FormControl>

          <CustomButton type="submit">ログイン</CustomButton>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        </FlexCol>
      </Box>
    </form>
  );
}
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, Input } from '@chakra-ui/react';
// import { signIn } from 'next-auth/react';

// const AuthLoginForm = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data: any) => {
//     await signIn('credentials', {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Input placeholder="Email" {...register('email')} />
//       <Input placeholder="Password" {...register('password')} type="password" />
//       <Button type="submit">Login</Button>
//     </form>
//   );
// };

// export default AuthLoginForm;
