import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export async function getBooks (req: Request, res: Response)  {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    throw error;
  }
};

export async function getBookById (req: Request, res: Response) {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    throw error;
  }
};

export async function createBook (req: Request, res: Response)  {
  try {
    const book = await bookService.createBook(req.body);
    res.json(book);
  } catch (error) {
    throw error;
  }
};

export async function updateBook (req: Request, res: Response)  {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    throw error;
  }
};

export async function deleteBook (req: Request, res: Response)  {
  try {
    await bookService.deleteBook(req.params.id);
    res.send("Book deleted");
  } catch (error) {
    throw error;
  }
};
