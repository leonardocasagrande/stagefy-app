import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório')
    .default(''),
  password: yup.string().default('').required('Senha é obrigatória'),
});

export default loginSchema;
