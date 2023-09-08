import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderdata = req.body;
  const token = req.cookies; // req.headers.authorization;
  const id = token.Token.userId;
  console.log('userId:', token.Token.userId);
  const result = await OrderService.createOrder(orderdata, id);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully !!',
    data: result,
  });
});
const getOrders = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrders();
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrive successfully !!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'somthing went wrong !!',
      data: error,
    });
  }
});
const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrder(req.params.orderId);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !!',
    data: result,
  });
});
export const OrderControlller = {
  createOrder,
  getOrders,
  getOrder,
};
