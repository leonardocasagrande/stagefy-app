import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRootStackNavigation } from '../../app.routes';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useAuth } from '../../context/auth';
import { useError } from '../../context/error';

const AppBuilder: React.FC = () => {
  const { reset } = useRootStackNavigation();
  const { loadAuth } = useAuth();
  const { setError } = useError();
  const loadApplication = React.useCallback(async () => {
    try {
      await loadAuth();
      reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err) {
      try {
        const confirmedIntro = await AsyncStorage.getItem(
          '@stagefy/confirmedIntro',
        );
        if (confirmedIntro === 'true') {
          reset({
            index: 0,
            routes: [{ name: 'CreateAccount' }],
          });
        } else {
          reset({
            index: 0,
            routes: [{ name: 'Introduction' }],
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    SplashScreen.hide();
  }, [reset, loadAuth, setError]);

  React.useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  return <View />;
};

export default AppBuilder;
