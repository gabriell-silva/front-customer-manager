import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../layout";
import { Input } from "../components/Input";
import {useAuthContext} from "../context/AuthContext.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {signInSchema} from "../schemas/login.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {user, signIn} = useAuthContext();
  const navigate = useNavigate();

  if(!!user?.token) {
    navigate("/");
  }

  const {
    register,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm({
    resolver: yupResolver(signInSchema)
  })

  return (
    <Layout>
      <Card bgColor={"orange.300"} w="full">
        <CardHeader>
          <Text fontWeight={"bold"} fontSize={"lg"} textAlign={"center"}>
            Informe os campos abaixo
          </Text>
        </CardHeader>

        <CardBody maxW={500} alignSelf={'center'}>
          <Stack as={'form'} onSubmit={handleSubmit((data) => signIn(data, () => navigate('/')))} spacing={4}>
            <Input label="Usuário" {...register(`username`)} />
            <Input label="Senha" type="password" {...register(`password`)}/>

            <Button colorScheme="blue" fontSize={"sm"} type={'submit'} isLoading={isSubmitting}>
              ENTRAR
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  );
}
