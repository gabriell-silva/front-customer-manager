import { Button, HStack } from "@chakra-ui/react";
import { LuHome, LuUser, LuUserX, LuUsers } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.tsx";

export function Header() {
  const { user, isAuthenticated, signOut } = useAuthContext();
  const navigate = useNavigate();

  return (
    <HStack
      p={4}
      borderBottomRadius={8}
      bgColor={"orange.300"}
      w={"full"}
      justifyContent={"space-between"}
      boxShadow={"lg"}
    >
      <HStack spacing={4}>
        <Link to={"/"}>
          <Button leftIcon={<LuHome />} colorScheme="blue" variant={"unstyled"}>
            Inicio
          </Button>
        </Link>

        {isAuthenticated && (
          <Link to={"/clientes"}>
            <Button
              leftIcon={<LuUsers />}
              colorScheme="blue"
              variant={"unstyled"}
            >
              Clientes
            </Button>
          </Link>
        )}
      </HStack>

      {!user?.token ? (
        <Link to={"/login"}>
          <Button leftIcon={<LuUser />} variant={"outline"} colorScheme="blue">
            Entrar
          </Button>
        </Link>
      ) : (
        <Button
          leftIcon={<LuUserX />}
          onClick={() => signOut(user?.token, () => navigate("/"))}
          variant={"outline"}
          colorScheme="red"
        >
          Sair
        </Button>
      )}
    </HStack>
  );
}
