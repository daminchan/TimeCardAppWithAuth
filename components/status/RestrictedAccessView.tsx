import React from "react";
import { Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import FlexCol from "@/components/ui/FlexCol";
import CustomButton from "../ui/Button/CustomButton";

interface RestrictedAccessViewProps {
  title?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
}

const RestrictedAccessView: React.FC<RestrictedAccessViewProps> = ({
  title = "アクセスが制限されています",
  message = "このページを表示するには、ログインが必要です。",
  linkText = "ログインページへ",
  linkHref = "/login",
}) => {
  return (
    <FlexCol py={6} align="center" justify="center">
      <Heading mb={4}>{title}</Heading>
      <Text mb={4}>{message}</Text>
      <Link href={linkHref} passHref>
        <CustomButton colorScheme="blue">{linkText}</CustomButton>
      </Link>
    </FlexCol>
  );
};

export default RestrictedAccessView;
