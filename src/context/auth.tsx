import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Axios } from '../config/axios';
import sessionsService from '../services/sessions';
import { IUser } from '../types';

interface IAuthContextProps {
  children: ReactNode;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IAuthContextData {
  user: IUser;
  token: string;
  refreshToken: string;
  signIn(credentials: SigninCredentials): Promise<void>;
  signOut(): Promise<void>;
  clearAuth(): void;
  loadAuth(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthState>({} as IAuthState);

  const signIn = useCallback(async ({ email, password }) => {
    const { refreshToken, user, token } = await sessionsService.login({
      email,
      password,
    });
    await AsyncStorage.setItem('@stagefy:token', token);
    await AsyncStorage.setItem('@stagefy:user', JSON.stringify(user));
    await AsyncStorage.setItem('@stagefy:refresh_token', refreshToken);
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    setAuthData({ token, user, refreshToken });
  }, []);

  const signOut = useCallback(async () => {
    await sessionsService.logout();
    await AsyncStorage.removeItem('@stagefy:token');
    await AsyncStorage.removeItem('@stagefy:user');
    await AsyncStorage.removeItem('@stagefy:refresh_token');
    setAuthData({} as IAuthState);
  }, []);

  const clearAuth = async () => {
    await AsyncStorage.removeItem('@stagefy:token');
    await AsyncStorage.removeItem('@stagefy:user');
    await AsyncStorage.removeItem('@stagefy:refresh_token');
    setAuthData({} as IAuthState);
  };

  const refreshUserToken = useCallback(async (refToken: string) => {
    const { token, user, refreshToken } =
      await sessionsService.refreshAccessToken(refToken);
    await AsyncStorage.setItem('@stagefy:token', token);
    await AsyncStorage.setItem('@stagefy:user', JSON.stringify(user));
    await AsyncStorage.setItem('@stagefy:refresh_token', refreshToken);
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setAuthData({ token, user, refreshToken });
  }, []);

  const loadAuth = async () => {
    const refreshToken = await AsyncStorage.getItem('@stagefy:refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token inexistente');
    }
    await refreshUserToken(refreshToken);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: authData.user,
        token: authData.token,
        refreshToken: authData.refreshToken,
        signOut,
        clearAuth,
        loadAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
