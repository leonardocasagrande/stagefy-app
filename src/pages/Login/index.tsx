import { View, Image } from 'react-native';
// import { Image, Text } from 'react-native-elements';
import React from 'react';
import styles from './styles';
import logo from '../../assets/images/logo_login.png';

const Login: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Image source={logo} />
    </View>
  );
};

export default Login;
