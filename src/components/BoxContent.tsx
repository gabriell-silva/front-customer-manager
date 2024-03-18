import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

export function BoxContent({ children, ...rest }: { children: ReactNode }) {
  return (
    <Stack bgColor={'orange.300'} w={"full"} p={4} spacing={12} rounded={"lg"} boxShadow={"lg"} {...rest}>
      {children}
    </Stack>
  );
}
