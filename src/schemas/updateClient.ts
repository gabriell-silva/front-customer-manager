import * as yup from "yup";

export const updateClientSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  date_birth: yup.string().required("Data de nascimento obrigatório"),
  document_cpf: yup.string().required("CPF obrigatório").min(11),
  document_rg: yup.string().required("RG obrigatório").min(11),
  phone_number: yup.string().required("Telefone obrigatório").min(11),
  addresses: yup.array().of(yup.object({
    street: yup.string().nullable("Endereço obrigatório"),
    number: yup.string().nullable("Número obrigatório"),
  })),
});
