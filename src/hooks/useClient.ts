import { useState } from "react";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../api/client";
import { useToast } from "@chakra-ui/react";

interface Client {
  id?: number;
  name: string;
  date_birth: string;
  document_cpf: string;
  document_rg: string;
  phone_number: string;
  street: string;
  number_home: string;
}

export function useClient() {
  const [clients, setClients] = useState<Array<Client>>([]);
  const [clientById, setClientById] = useState<Client>();
  const toast = useToast();

  const handleGetClients = async () => {
    await getClients()
      .then(({ data }) => setClients(data))
      .catch((error) => console.log(error));
  };

  const handleGetClientById = async (id: number) => {
    const { data } = await getClientById(id).catch(({ message }) =>
      toast({ title: message, status: "error" })
    );

    setClientById(data);
    return data;
  };

  const handleCreateClient = async (formData: Object, fn = () => null) => {
    await createClient(formData)
      .then(({ message }) => toast({ title: message, status: "success" }))
      .then(fn)
      .catch(({ message }) => toast({ title: message, status: "error" }));
  };

  const handleUpdateClient = async (
    id: number,
    formData: Object,
    fn = () => null
  ) => {
    await updateClient(id, formData)
      .then(({ message }) => {
        toast({ title: message, status: "success" });
      })
      .then(fn)
      .catch(({ message }) => toast({ title: message, status: "error" }));
  };

  const handleDeleteClient = async (id: number) => {
    await deleteClient(id)
      .then(({ message }) => {
        setClients((clients) => clients.filter((client) => client?.id !== id));

        toast({ title: message, status: "success" });
      })
      .catch(({ message }) => toast({ title: message, status: "error" }));
  };

  return {
    clients,
    handleGetClients,

    clientById,
    handleGetClientById,

    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
  };
}
