import { Button } from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  colorScheme?: string;
  size?: string;
  type?: "button" | "submit" | "reset";
  color?: string; // 文字色を変更可能にする
  width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  colorScheme = "blue",
  size = "lg",
  type = "button",
  color = "white", // デフォルトの文字色を白に設定
  width = "100%",
  ...props
}) => {
  return (
    <Button
      colorScheme={colorScheme}
      size={size}
      type={type}
      color={color}
      width={width} // デフォルトの幅
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
