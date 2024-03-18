import { useRouteError } from "react-router-dom";
import { Layout } from "../layout";
import { TitleContent } from "../components/TitleContent";
import { Center, Text } from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";
import { BoxContent } from "../components/BoxContent";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Layout>
      <BoxContent>
        <Center>
          <TitleContent>
            {error?.status} {error?.statusText}!
          </TitleContent>
        </Center>

        <Center flexDirection={"column"} gap={8}>
          <IoWarningOutline size={52} color="red" />

          <Text fontSize={"lg"}>Ops!! a rota que procura não existe.</Text>
        </Center>
      </BoxContent>
    </Layout>
  );
}
