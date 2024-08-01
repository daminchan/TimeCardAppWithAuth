"use client";

import { signUp } from "@/features/auth/lib/authActions";
import { useFormState } from "react-dom";
import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import FlexCol from "@/components/ui/FlexCol";
import CustomButton from "@/components/ui/Button/CustomButton";

export default function AuthSignUpForm() {
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  return (
    <form action={dispatch}>
      <Box borderRadius="lg" bg="gray.50" p={6}>
        <FlexCol>
          <FormControl>
            <FormLabel htmlFor="name" color="gray.800">
              Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="名前"
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
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <Text key={error} mt={2} color="red.500">
                  {error}
                </Text>
              ))}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="role" color="gray.800">
              Role
            </FormLabel>
            <Input
              id="role"
              type="text"
              name="role"
              placeholder="ロール"
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
            {state.errors?.role &&
              state.errors.role.map((error: string) => (
                <Text key={error} mt={2} color="red.500">
                  {error}
                </Text>
              ))}
          </FormControl>

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

// export default function AuthSignUpForm() {
//   const initialState = { message: null, error: {} };
//   const [state, dispatch] = useFormState(signUp, initialState);

//   return (
//     <form action={dispatch} className="w-full">
//       <Box width="100%" borderRadius="lg" bg="gray.50" p={6}>
//         <FlexCol gap={4}>
//           <FormControl>
//             <FormLabel htmlFor="email" color="gray.800">
//               Email
//             </FormLabel>
//             <Input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="メールアドレス"
//               required
//               border="1px"
//               borderColor="gray.200"
//               color="gray.700"
//               _placeholder={{ color: "gray.400" }}
//               _focus={{ color: "gray.900" }}
//               pl={2}
//               py={2}
//               borderRadius="md"
//             />
//             {state.errors?.email &&
//               state.errors.email.map((error: string) => (
//                 <Text key={error} mt={2} color="red.500">
//                   {error}
//                 </Text>
//               ))}
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="password" color="gray.800">
//               Password
//             </FormLabel>
//             <Input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="パスワード"
//               required
//               border="1px"
//               borderColor="gray.200"
//               color="gray.700"
//               _placeholder={{ color: "gray.400" }}
//               _focus={{ color: "gray.900" }}
//               pl={2}
//               py={2}
//               borderRadius="md"
//             />
//             {state.errors?.password &&
//               state.errors.password.map((error: string) => (
//                 <Text key={error} mt={2} color="red.500">
//                   {error}
//                 </Text>
//               ))}
//           </FormControl>

//           <CustomButton type="submit">サインアップ</CustomButton>
//           {state.message && (
//             <Text mt={2} color="red.500">
//               {state.message}
//             </Text>
//           )}
//         </FlexCol>
//       </Box>
//     </form>
//   );
// }
