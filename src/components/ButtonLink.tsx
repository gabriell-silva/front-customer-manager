import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps extends ButtonProps {
  children: ReactNode;
  icon?: Omit | any;
  href: string;
  color: string;
}

export function ButtonLink({
  children,
  color,
  icon,
  href,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link to={href}>
      <Button leftIcon={icon} colorScheme={color} {...rest}>
        {children}
      </Button>
    </Link>
  );
}
