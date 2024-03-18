import { As, HStack, Heading, HeadingProps, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TitleContentProps extends HeadingProps {
  icon?: As;
  iconSize?: number | string;
  children: string | ReactNode;
}

export function TitleContent({icon, iconSize, children}: TitleContentProps) {
  return (
    <HStack>
      {!!icon && <Icon as={icon} fontSize={iconSize ? iconSize : 22 }/>}

      <Heading as={"h2"} fontSize={"2xl"}>
        {children}
      </Heading>
    </HStack>
  );
}
