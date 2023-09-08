import { Users } from '@prisma/client';

import prisma from '../../../shared/prisma';

const getsignup = async (): Promise<Users[] | null> => {
  const result = await prisma.users.findMany();
  return result;
};

const getSingle = async (id: string): Promise<Users | null> => {
  const result = await prisma.users.findUnique({ where: { id } });
  return result;
};
const updateUser = async (
  id: string,
  payload: Users
): Promise<Users | null> => {
  const result = await prisma.users.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteUser = async (id: string): Promise<Users | null> => {
  const result = await prisma.users.delete({ where: { id } });
  return result;
};
export const UserService = {
  getsignup,
  getSingle,
  updateUser,
  deleteUser,
};
