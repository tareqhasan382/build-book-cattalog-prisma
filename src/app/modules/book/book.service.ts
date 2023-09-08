/* eslint-disable @typescript-eslint/no-explicit-any */
import { Books, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchAbleFields, IBookFiltersRequest } from './book.interface';

const createBook = async (data: Books) => {
  console.log('service:', data);
  const result = await prisma.books.create({ data });

  return result;
};

const getBooks = async (
  filters: IBookFiltersRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Books[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log('options service:', options);
  console.log('filters service:', filters);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.BooksWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  //const result = await prisma.books.findMany();
  const result = await prisma.books.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: { category: { select: { title: true } } },
  });

  const total = await prisma.books.count(); //const totalCount = await prisma.books.count({ where });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getBooksByCategoryId = async (categoryId: string): Promise<Books[]> => {
  const results = await prisma.books.findMany({
    where: { categoryId },
    include: { category: { select: { title: true } } },
  });
  return results;
};
const getBook = async (id: string): Promise<Books | null> => {
  const result = await prisma.books.findUnique({
    where: { id },
    include: { category: { select: { title: true } } },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Books
): Promise<Books | null> => {
  const result = await prisma.books.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Books | null> => {
  const result = await prisma.books.delete({ where: { id } });
  return result;
};
export const BookService = {
  createBook,
  getBooks,
  getBooksByCategoryId,
  getBook,
  updateBook,
  deleteBook,
};
