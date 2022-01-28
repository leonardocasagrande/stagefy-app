export interface IAuth {
  token: string;
  refreshToken: string;
  user: IUser;
}

export enum ProfileRoleEnum {
  Admin = 'ADMIN',
  Professional = 'PROFESSIONAL',
  Responsible = 'RESPONSIBLE',
  Student = 'STUDENT',
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
}

export interface IEvent {
  channelName?: string;
  date: string;
  id: string;
  image: string;
  name: string;
  views: number;
}

export interface IStartedEvent extends IEvent {
  channelName: string;
}
