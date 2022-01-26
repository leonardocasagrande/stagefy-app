import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useRootStackNavigation } from '../../app.routes';
import logo from '../../assets/images/logo_intro.png';
import introText from '../../content/introText';
import textStyles from '../../theme/textStyles';
import { styles } from './styles';

const Introduction: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const { navigate } = useRootStackNavigation();

  const handleContinue = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('@stagefy/confirmedIntro', 'true');
      navigate('Login');
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
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
        <Button
          onPress={handleContinue}
          loading={loading}
          title="Entendi e quero continuar"
        />
      </View>
    </View>
  );
};

export default Introduction;
