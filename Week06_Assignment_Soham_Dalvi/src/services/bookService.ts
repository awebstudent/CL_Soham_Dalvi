import  Book  from '../models/bookModel';
import  Author  from '../models/authorModel';



export const getBooks = async () => {
  return await Book.findAll();
};

export const getBookById = async (id: string) => {
  return await Book.findByPk(id, { include: [Author] });
};

export const createBook = async (data: any) => {
  return await Book.create(data);
};

export const updateBook = async (id: string, data: any) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Book not found');
  return await book.update(data);
};

export const deleteBook = async (id: string) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Book not found');
  return await book.destroy();
};

