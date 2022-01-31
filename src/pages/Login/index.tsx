import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRootStackNavigation } from '../../app.routes';
import logo from '../../assets/images/logo_login.png';
import StyledInput from '../../components/StyledInput';
import { useAuth } from '../../context/auth';
import { useError } from '../../context/error';
import loginSchema from '../../schemas/login';
import textStyles from '../../theme/textStyles';
import styles from './styles';
import axios from 'axios';
import { useLoading } from '../../context/loading';
import { ProfileRoleEnum } from '../../models/role';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signIn } = useAuth();

  const { navigate, reset } = useRootStackNavigation();

  const { setError } = useError();

  const { setLoading } = useLoading();

  const { handleChange, handleBlur, errors, touched, handleSubmit } = useFormik(
    {
      initialValues: loginSchema.getDefault(),
      validationSchema: loginSchema,
      onSubmit: async formValues => {
        setLoading(true);
        try {
          const role = await signIn({
            email: formValues.email,
            password: formValues.password,
          });
          if (role === ProfileRoleEnum.Professional) {
            reset({
              index: 0,
              routes: [{ name: 'StreamerHome' }],
            });
          } else {
            reset({
              index: 0,
              routes: [{ name: 'HomeTabs' }],
            });
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.message);
          }
        }
        setLoading(false);
      },
    },
  );

  const handleCreatePress = () => {
    navigate('CreateAccount');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ minHeight: '100%' }}>
      <View style={styles.screen}>
        <Image style={styles.image} source={logo} />
        <View style={styles.form}>
          <View style={styles.title}>
            <Text style={textStyles.header2}>Login</Text>
          </View>
          <StyledInput
            label="E-mail"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="Digite seu e-mail"
            errorMessage={touched.email ? errors.email : undefined}
          />
          <StyledInput
            label="Senha"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Digite sua senha"
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

          <View style={styles.button}>
            <Button onPress={handleSubmit} title="Entrar" />
          </View>
          <TouchableOpacity
            onPress={handleCreatePress}
            style={styles.loginText}
          >
            <Text style={textStyles.caption}>
              {'Não tem login? '}
              <Text style={textStyles.captionSecondary}>Cadastre-se agora</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
