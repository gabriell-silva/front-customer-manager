import { LuMinus, LuPencilLine, LuPlus, LuSave, LuX } from "react-icons/lu";
import { BoxContent } from "../../../components/BoxContent";
import { TitleContent } from "../../../components/TitleContent";
import { Layout } from "../../../layout";
import { Box, Button, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Input } from "../../../components/Input";
import { ButtonLink } from "../../../components/ButtonLink";
import { useClient } from "../../../hooks/useClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { updateClientSchema } from "../../../schemas/updateClient";
import { yupResolver } from "@hookform/resolvers/yup";
import {useAuthContext} from "../../../context/AuthContext.tsx";

export default function Edit() {
  const { handleGetClientById, handleUpdateClient } = useClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuthContext();

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateClientSchema),
  });

  const {
    fields: addresses,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  async function handleSubmitClient(formData: Object) {
    await handleUpdateClient(Number(id), formData, () => navigate("/clientes"));
  }

  useEffect(() => {
    if(Number(id)) {
      handleGetClientById(Number(id)).then((data) => reset(data));
    }
  }, [Number(id)]);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <BoxContent>
        <TitleContent icon={LuPencilLine}>Editar Cliente</TitleContent>

        <Stack
          spacing={8}
          as={"form"}
          onSubmit={handleSubmit((formData) => handleSubmitClient(formData))}
        >
         <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={[2, 8]}>
            <Input label="Nome" {...register(`name`)} />
            <Input
              label="Nascimento"
              type="date"
              {...register(`date_birth`)}
              error={errors.date_birth}
            />
            <Input
              label="CPF"
              {...register(`document_cpf`)}
              error={errors.document_cpf}
            />
            <Input
              label="RG"
              {...register(`document_rg`)}
              error={errors.document_rg}
            />
            <Input
              label="Telefone"
              type="tel"
              {...register(`phone_number`)}
              error={errors.phone_number}
            />
          </SimpleGrid>

          <Stack spacing={4}>
            <Box>
              <Text fontWeight={"bold"}>Endereço(s)</Text>
            </Box>

            {addresses.map((_, index) => (
              <Stack key={index}>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 2 }}
                  spacing={[6, 8]}
                >
                  <Input
                    label="Rua / Avenida"
                    type="tel"
                    {...register(`addresses[${index}].street`)}
                  />
                  <Input
                    label="Número"
                    type="tel"
                    {...register(`addresses[${index}].number`)}
                  />
                </SimpleGrid>
              </Stack>
            ))}

            <HStack>
              <Button
                onClick={() => {
                  append({});
                }}
                size={"xs"}
                colorScheme="blue"
                leftIcon={<LuPlus />}
              >
                Adicionar endereço
              </Button>
            </HStack>
          </Stack>

          <HStack spacing={4} justifyContent={"flex-end"}>
            <ButtonLink icon={<LuX size={20} />} href="/clientes" color="red">
              Cancelar
            </ButtonLink>

            <Button
              leftIcon={<LuSave size={20} />}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
            >
              Salvar
            </Button>
          </HStack>
        </Stack>
      </BoxContent>
    </Layout>
  );
}
