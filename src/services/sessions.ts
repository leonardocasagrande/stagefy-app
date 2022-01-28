import { Axios } from '../config/axios';
import { IAuth } from '../types';

interface ILogin {
  email: string;
  password: string;
}

const login = async (body: ILogin) => {
  const { data } = await Axios.post<IAuth>('sessions', body);
  return data;
};

const logout = async () => {
  await Axios.delete('sessions');
};

const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await Axios.post<IAuth>('sessions/refresh-token', {
    refresh_token: refreshToken,
  });
  return data;
};
const sessionsService = {
  login,
  logout,
  refreshAccessToken,
};

export default sessionsService;
