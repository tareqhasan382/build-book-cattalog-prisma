import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order, id: string) => {
  console.log('orderId:', id);
  const result = await prisma.order.create({
    data: {
      userId: id,
      orderedBooks: data,
    },
  });
  console.log('OrderService:', result);
  return result;
};
const getOrders = async () => {
  const result = await prisma.order.findMany();

  return result;
};
const getOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: { id },
  });
  return result;
};
export const OrderService = {
  createOrder,
  getOrders,
  getOrder,
};
