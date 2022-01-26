import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRootStackNavigation } from '../../app.routes';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AppBuilder: React.FC = () => {
  const { navigate } = useRootStackNavigation();
  const loadApplication = React.useCallback(async () => {
    try {
      const confirmedIntro = await AsyncStorage.getItem(
        '@stagefy/confirmedIntro',
      );
      if (confirmedIntro === 'true') {
        navigate('Login');
      } else {
        navigate('Introduction');
      }
      SplashScreen.hide();
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  React.useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  return <View />;
};

export default AppBuilder;
