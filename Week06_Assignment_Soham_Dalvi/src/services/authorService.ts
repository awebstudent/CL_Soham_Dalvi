import  Author  from '../models/authorModel';
import  Book  from '../models/bookModel';

export const getAuthors = async () => {
  return await Author.findAll();
};

export const getAuthorById = async (id: string) => {
  return await Author.findByPk(id, { include: [Book] });
};

export const createAuthor = async (data: any) => {
  return await Author.create(data);
};

export const updateAuthor = async (id: string, data: any) => {
  const author = await Author.findByPk(id);
  if (!author) throw new Error('Author not found');
  return await author.update(data);
};

export const deleteAuthor = async (id: string) => {
  const author = await Author.findByPk(id);
  if (!author) throw new Error('Author not found');
  return await author.destroy();
};
