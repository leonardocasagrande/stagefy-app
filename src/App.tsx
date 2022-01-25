import React from 'react';
import { StreamProvider } from './context/stream';
import AppNavigationContainer from './app.routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StreamProvider>
          <AppNavigationContainer />
        </StreamProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
