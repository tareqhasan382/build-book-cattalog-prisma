import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category) => {
  const result = await prisma.category.create({ data });
  return result;
};

const getCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany();
  return result;
};
const getCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: { book: true },
  });
  return result;
};

const updateCategory = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  await prisma.books.deleteMany({
    where: {
      categoryId: id,
    },
  });

  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};
export const CategoryService = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
