import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faUsers,
  faWallet,
  faSatelliteDish,
  faTrashAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './app.routes';
import { AuthProvider } from './context/auth';
import { ErrorProvider } from './context/error';
import { LoadingProvider } from './context/loading';
import { StreamProvider } from './context/stream';
import { SuccessProvider } from './context/success';
import theme from './theme';

library.add(
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faUsers,
  faWallet,
  faSatelliteDish,
  faTrashAlt,
  faSignOutAlt,
);

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <SuccessProvider>
            <LoadingProvider>
              <AuthProvider>
                <StreamProvider>
                  <AppNavigationContainer />
                </StreamProvider>
              </AuthProvider>
            </LoadingProvider>
          </SuccessProvider>
        </ErrorProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
