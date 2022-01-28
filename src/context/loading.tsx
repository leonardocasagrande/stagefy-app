import React, { createContext, ReactNode, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../theme/colors';

interface ILoadingContextValues {
  loading: boolean;
  setLoading(val: boolean): void;
}

interface ILoadingContextProps {
  children: ReactNode;
}

const LoadingContext = createContext<ILoadingContextValues>(
  {} as ILoadingContextValues,
);

export const LoadingProvider = ({ children }: ILoadingContextProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      <Spinner
        visible={loading}
        cancelable={false}
        color={colors.primaryMain}
        overlayColor={'#00000080'}
      />
    </LoadingContext.Provider>
  );
};

export function useLoading() {
  const context = React.useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within an LoadingProvider');
  }

  return context;
}
