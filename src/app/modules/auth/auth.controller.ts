import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
// import bcrypt = require('bcrypt');
const signup = catchAsync(async (req: Request, res: Response) => {
  try {
    // const { name, email, password, role, contactNo, address, profileImg } =
    //   req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const data = {
    //   name: name,
    //   email: email,
    //   password: hashedPassword,
    //   role: role,
    //   contactNo: contactNo,
    //   address: address,
    //   profileImg: profileImg,
    // };
    const result = await AuthService.signup(req.body);
    res.status(400).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'signup successfully !!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
});
const login = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...loginData } = req.body;

    const result = await AuthService.login(loginData);
    //console.log('result:', result);
    const { accessToken, userId } = result;
    const cookieOptions = {
      secure: process.env.NODE_ENV == 'production', // config.env === 'production'
      httpOnly: true,
    };
    const token = { accessToken, userId };
    res.cookie('Token', token, cookieOptions);

    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users login successfully !!',
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'something went wrong !!',
      data: error,
    });
  }
});

export const AuthControlller = {
  signup,
  login,
};
