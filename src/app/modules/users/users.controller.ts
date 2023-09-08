import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';

const getsignup = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getsignup();
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrive successfully !!',
      data: result,
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
const getsingle = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingle(req.params.id);
  sendResponse<Users>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !!',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !!',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse<Users>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users deleted successfully !!',
    data: result,
  });
});

export const UserControlller = {
  getsignup,
  getsingle,
  updateUser,
  deleteUser,
};
