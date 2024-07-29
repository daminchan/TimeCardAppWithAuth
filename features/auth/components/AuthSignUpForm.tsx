"use client";

import { signUp } from "@/features/auth/lib/authActions";
import { useFormState } from "react-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import FlexCol from "@/components/ui/FlexCol";
import CustomButton from "@/components/ui/Button/CustomButton";

export default function AuthSignUpForm() {
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  return (
    <form action={dispatch} className="w-full">
      <Box width="100%" borderRadius="lg" bg="gray.50" p={6}>
        <FlexCol gap={4}>
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
              color="gray.700"
              _placeholder={{ color: "gray.400" }}
              _focus={{ color: "gray.900" }}
              pl={2}
              py={2}
              borderRadius="md"
            />
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <Text key={error} mt={2} color="red.500">
                  {error}
                </Text>
              ))}
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
              color="gray.700"
              _placeholder={{ color: "gray.400" }}
              _focus={{ color: "gray.900" }}
              pl={2}
              py={2}
              borderRadius="md"
            />
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <Text key={error} mt={2} color="red.500">
                  {error}
                </Text>
              ))}
          </FormControl>

          <CustomButton type="submit">サインアップ</CustomButton>
          {state.message && (
            <Text mt={2} color="red.500">
              {state.message}
            </Text>
          )}
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
