import express from 'express';
import { BookControlller } from './book.controller';

const router = express.Router();
router.post('/books', BookControlller.createBook);
router.get('/books', BookControlller.getBooks);
//router.get('/books/:categoryId/category', BookControlller.getBook); // books/:categoryId/category
router.get('/books/:categoryId/category', BookControlller.getBooksByCategoryId);
router.get('/books/:id', BookControlller.getBook);
router.patch('/books/:id', BookControlller.updateBook);
router.delete('/books/:id', BookControlller.deleteBook);

export const BookRoutes = router;
