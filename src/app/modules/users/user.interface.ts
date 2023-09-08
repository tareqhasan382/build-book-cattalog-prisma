import { ENUM_USER_ROLE } from '../../../enums/user';

export type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  userId: string;
  role: string;
  // refreshToken?: string;
  // needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};
