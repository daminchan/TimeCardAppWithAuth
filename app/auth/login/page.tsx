import CustomButton from "@/components/ui/Button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import AuthLoginForm from "@/features/auth/components/AuthLoginForm";
import { Link } from "@chakra-ui/react";
import React from "react";
// import AuthLoginForm from '@/features/auth/components/AuthLoginForm';

const LoginPage = () => {
  return (
    <FlexCol minH="100vh" align="center" justify="center" py={6} gap={4}>
      <AuthLoginForm />
      <CustomButton width="200px">
        <Link href="/">ホーム</Link>
      </CustomButton>
    </FlexCol>
  );
};

export default LoginPage;
