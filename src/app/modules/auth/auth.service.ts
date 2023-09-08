import { Users } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

// import bcrypt = require('bcrypt');
const signup = async (data: Users) => {
  //  const { name, email, password, role, contactNo, address, profileImg } =
  //     data;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const userData = {
  //     name: name,
  //     email: email,
  //     password: hashedPassword,
  //     role: role,
  //     contactNo: contactNo,
  //     address: address,
  //     profileImg: profileImg,
  //   };
  const result = await prisma.users.create({ data });
  return result;
};
const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Invalid password');
  // }
  const isPasswordValid = await (password === user.password);
  console.log('isPasswordValid:', isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid password');
  }
  const { id: userId, role } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    process.env.secret as Secret,
    process.env.expires_in as string
  );
  return {
    accessToken,
    userId,
    role,
  };
};

export const AuthService = {
  signup,
  login,
};
