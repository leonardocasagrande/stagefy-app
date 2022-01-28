import * as yup from 'yup';

const userSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .default('')
    .test(
      'name must be two strings',
      'O nome deve conter pelo menos duas palavras',
      value => !!value && value.split(' ').length >= 2,
    ),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório')
    .default(''),
  password: yup
    .string()
    .default('')
    .required('Senha é obrigatória')
    .min(8, 'A senha deve conter no mínimo 8 caracteres'),
  confirmPassword: yup
    .string()
    .default('')
    .oneOf([yup.ref('password'), null], 'As senhas devem coincidir'),
  acceptTerms: yup
    .bool()
    .default(false)
    .oneOf([true], 'Você deve aceitar os termos e condições de uso'),
});

export default userSchema;
