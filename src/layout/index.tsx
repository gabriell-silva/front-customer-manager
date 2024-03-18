import { ReactNode } from "react";
import { Header } from "./Header";
import { VStack } from "@chakra-ui/react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <VStack
      maxW="full"
      spacing={{base: 8, md: 12}}
      px={{base: 2, md: 12}}
      h={"100vh"}
      bgColor={'blue.700'}
    >
      <Header />

      {children}
    </VStack>
  );
}
