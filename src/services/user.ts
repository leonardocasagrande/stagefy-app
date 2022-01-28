// import { Axios } from '../config/axios';
import { Axios } from '../config/axios';
import { IUser } from '../types';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

const createUser = async (body: ICreateUser) => {
  const { data } = await Axios.post<IUser>('responsibles', body);
  return data;
};

const userService = {
  createUser,
};

export default userService;
