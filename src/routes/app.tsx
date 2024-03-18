import {
  Center,
  HStack,
  Image,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BoxContent } from "../components/BoxContent";
import { TitleContent } from "../components/TitleContent";
import { Layout } from "../layout";

export default function App() {
  return (
    <Layout>
      <BoxContent>
        <Center gap={4}>
          <Image src="/clients.png" w={100} h={100} />

          <TitleContent>Bem vindo, ao gerenciador de clientes</TitleContent>
        </Center>
      </BoxContent>
    </Layout>
  );
}
