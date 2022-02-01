// import { Image, Text } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRootStackNavigation } from '../../app.routes';
import logo from '../../assets/images/logo_login.png';
import StyledInput from '../../components/StyledInput';
import { useAuth } from '../../context/auth';
import userSchema from '../../schemas/user';
import userService from '../../services/user';
import textStyles from '../../theme/textStyles';
import styles from './styles';
import axios from 'axios';
import { useError } from '../../context/error';
import { useSuccess } from '../../context/success';
import { useLoading } from '../../context/loading';

const CreateAccount: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signIn } = useAuth();
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const { setLoading } = useLoading();

  const { navigate, reset } = useRootStackNavigation();

  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: userSchema.getDefault(),
    validationSchema: userSchema,
    onSubmit: async formValues => {
      setLoading(true);
      try {
        await userService.createUser({
          email: formValues.email,
          name: formValues.name,
          password: formValues.password,
        });
        await signIn({
          email: formValues.email,
          password: formValues.password,
        });
        reset({
          index: 0,
          routes: [{ name: 'HomeTabs' }],
        });
        setSuccess('Conta criada com sucesso!');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        }
      }
      setLoading(false);
    },
  });

  const handleLoginPress = () => {
    navigate('Login');
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.screen}>
        <Image style={styles.image} source={logo} />
        <View style={styles.form}>
          <View style={styles.title}>
            <Text style={textStyles.header2}>Cadastre-se</Text>
          </View>
          <StyledInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            label="Nome"
            placeholder="Digite seu nome"
            helperMessage="O nome deve conter pelo menos duas palavras."
            errorMessage={touched.name ? errors.name : undefined}
          />
          <StyledInput
            label="E-mail"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="Digite seu e-mail"
            errorMessage={touched.email ? errors.email : undefined}
            autoCapitalize="none"
          />
          <StyledInput
            label="Senha"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Digite sua senha"
            helperMessage="A senha deve conter pelo menos 8 digitos."
            secureTextEntry={!passwordVisible}
            errorMessage={touched.password ? errors.password : undefined}
            rightIcon={
              <TouchableOpacity
                onPress={() => setPasswordVisible(prevValue => !prevValue)}
              >
                <FontAwesomeIcon icon={passwordVisible ? 'eye-slash' : 'eye'} />
              </TouchableOpacity>
            }
          />
          <StyledInput
            label="Confirme a senha"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            placeholder="Digite sua senha"
            secureTextEntry={!passwordVisible}
            errorMessage={
              touched.confirmPassword ? errors.confirmPassword : undefined
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setPasswordVisible(prevValue => !prevValue)}
              >
                <FontAwesomeIcon icon={passwordVisible ? 'eye-slash' : 'eye'} />
              </TouchableOpacity>
            }
          />
          <CheckBox
            checked={values.acceptTerms}
            onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}
            onBlur={handleBlur('acceptTerms')}
            title={
              <Text style={textStyles.label}>
                {'Eu aceito os '}
                <Text style={textStyles.labelPrimary}>
                  termos e condições de uso
                </Text>
                {' e '}
                <Text style={textStyles.labelPrimary}>
                  políticas de privacidade
                </Text>
              </Text>
            }
          />
          {!!touched.acceptTerms && !!errors.acceptTerms && (
            <Text style={textStyles.helperError}>{errors.acceptTerms}</Text>
          )}
          <View style={styles.button}>
            <Button onPress={handleSubmit} title="Me cadastrar" />
          </View>
          <TouchableOpacity onPress={handleLoginPress} style={styles.loginText}>
            <Text style={textStyles.caption}>
              {'Já tem login? '}
              <Text style={textStyles.captionSecondary}>Faça login agora</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateAccount;
