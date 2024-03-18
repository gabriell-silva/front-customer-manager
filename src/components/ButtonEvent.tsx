import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonEventProps extends ButtonProps {
  children: ReactNode;
  icon?: Omit | any;
  color: string;
}

export function ButtonEvent({
  children,
  color,
  icon,
  ...rest
}: ButtonEventProps) {
  return (
    <Button leftIcon={icon} colorScheme={color} {...rest}>
      {children}
    </Button>
  );
}
