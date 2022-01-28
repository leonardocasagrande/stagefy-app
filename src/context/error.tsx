import React, { createContext, ReactNode, useState } from 'react';
import ErrorModal from '../components/ErrorModal';

interface IErrorContextValues {
  error: string | null;
  setError(val: string | null): void;
}

interface IErrorContextProps {
  children: ReactNode;
}

const ErrorContext = createContext<IErrorContextValues>(
  {} as IErrorContextValues,
);

export const ErrorProvider = ({ children }: IErrorContextProps) => {
  const [error, setError] = useState<string | null>(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <ErrorModal
        description={error}
        onClose={() => setError(null)}
        visible={!!error}
      />
    </ErrorContext.Provider>
  );
};

export function useError() {
  const context = React.useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
}
