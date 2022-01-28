import React, { createContext, ReactNode, useState } from 'react';
import SuccessModal from '../components/SuccessModal';

interface ISuccessContextValues {
  success: string | null;
  setSuccess(val: string | null): void;
}

interface ISuccessContextProps {
  children: ReactNode;
}

const SuccessContext = createContext<ISuccessContextValues>(
  {} as ISuccessContextValues,
);

export const SuccessProvider = ({ children }: ISuccessContextProps) => {
  const [success, setSuccess] = useState<string | null>(null);
  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
      <SuccessModal
        description={success}
        onClose={() => setSuccess(null)}
        visible={!!success}
      />
    </SuccessContext.Provider>
  );
};

export function useSuccess() {
  const context = React.useContext(SuccessContext);

  if (!context) {
    throw new Error('useSuccess must be used within an SuccessProvider');
  }

  return context;
}
