import { useEffect, useState } from "react";
import { useClient } from "../../hooks/useClient";
import {
  ButtonGroup,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { phoneMask } from "../../functions/phoneMask";
import { cpfMask } from "../../functions/cpfMask";
import { rgMask } from "../../functions/rgMask";
import { Layout } from "../../layout";
import { formatDate } from "../../functions/formatDate";
import {
  LuPencilLine,
  LuPin,
  LuTrash,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import { TitleContent } from "../../components/TitleContent";
import { BoxContent } from "../../components/BoxContent";
import { ButtonLink } from "../../components/ButtonLink";
import { ButtonEvent } from "../../components/ButtonEvent";
import { Alert } from "../../components/ModalAlert";
import { ModalAddress } from "../../components/ModalAddress";
import { useAuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";


export interface Address {
  id: number;
  street: string;
  number: string;
}

export interface User {
  id: number;
  name: string;
  date_birth: string;
  document_cpf: string;
  document_rg: string;
  phone_number: string;
  addresses: Address[];
}


export default function Clients() {
  const { clients, handleGetClients, handleDeleteClient } = useClient();
  const [clientSelected, setClientSelected] = useState<User>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAddress,
    onOpen: onOpenAddress,
    onClose: onCloseAddress,
  } = useDisclosure();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleClickAlert = (client: object, action: string) => {
    action === "delete" ? onOpen() : onOpenAddress();

    setClientSelected(client);
  };

  const handleDelete = () => {
    handleDeleteClient(clientSelected?.id);
  };

  useEffect(() => {
    handleGetClients();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        onClick={handleDelete}
        data={{
          title: `Quer excluir o cliente?`,
          description:
            "Tem certeza que deseja excluir o cliente? Essa ação não pode ser revertida!",
          labelButtonConfirmation: "Sim, excluir",
          labelButtonCancel: "Não",
          buttonConfirmColor: "green",
        }}
      />

      <ModalAddress
        isOpen={isOpenAddress}
        onClose={onCloseAddress}
        data={clientSelected}
      />

      <BoxContent>
        <HStack justifyContent={"space-between"}>
          <TitleContent icon={LuUsers}>Clientes</TitleContent>

          <ButtonLink icon={<LuUserPlus />} color="blue" href="/clientes/criar">
            Novo
          </ButtonLink>
        </HStack>

        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Informações - Clientes</TableCaption>

            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Dt. Nascimento</Th>
                <Th>CPF</Th>
                <Th>RG</Th>
                <Th>Telefone</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>

            {clients?.map((client: any) => (
              <Tbody key={client.id}>
                <Tr>
                  <Td>{client.name}</Td>
                  <Td>{formatDate(client.date_birth)}</Td>
                  <Td>{cpfMask(client.document_cpf)}</Td>
                  <Td>{rgMask(client.document_rg)}</Td>
                  <Td>{phoneMask(client.phone_number)}</Td>

                  <Td>
                    <ButtonGroup spacing={0}>
                      <ButtonEvent
                        aria-label="delete-client"
                        color="green"
                        size={"xs"}
                        variant={"outline"}
                        borderRightRadius={0}
                        icon={<LuPin size={16} />}
                        onClick={() => handleClickAlert(client, "address")}
                      >
                        Endereços
                      </ButtonEvent>

                      <ButtonLink
                        aria-label="edit-client"
                        variant={"outline"}
                        color="blue"
                        size={"xs"}
                        borderLeftRadius={0}
                        borderRightRadius={0}
                        href={`/clientes/${client.id}/editar`}
                        icon={<LuPencilLine size={18} />}
                      >
                        Editar
                      </ButtonLink>

                      <ButtonEvent
                        aria-label="delete-client"
                        color="red"
                        size={"xs"}
                        variant={"outline"}
                        borderLeftRadius={0}
                        icon={<LuTrash size={18} />}
                        onClick={() => handleClickAlert(client, "delete")}
                      >
                        Excluir
                      </ButtonEvent>
                    </ButtonGroup>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </BoxContent>
    </Layout>
  );
}
