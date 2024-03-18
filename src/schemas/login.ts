import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup.string().required("Usuário obrigatório"),
  password: yup.string().required("Senha obrigatório"),
});
