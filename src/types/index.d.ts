import { ProfileRoleEnum } from '../models/role';

export interface IAuth {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
  profileRole: ProfileRoleEnum;
  avatar?: string;
  professional?: IProfessional;
}

export interface IProfessional {
  artisticName: string;
  bio: string;
  user: IUser;
}

export interface IEvent {
  date: string;
  id: string;
  image: string;
  name: string;
  views: number;
  professional: IProfessional;
  currentViews: number;
  streamerPeerId?: number;
}

export interface ILike {
  user: IUser;
  event: IEvent;
}
