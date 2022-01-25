import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import logo from '../../assets/images/logo_intro.png';
import introText from '../../content/introText';
import textStyles from '../../theme/textStyles';
import { styles } from './styles';
const Introduction: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image source={logo} />
      </View>
      <View style={styles.card}>
        <View style={styles.titleWrapper}>
          <Text style={textStyles.IntroHeading}>Olá!</Text>
        </View>
        <Text style={textStyles.body}>{introText}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Entendi e quero continuar" />
      </View>
    </View>
  );
};

export default Introduction;
