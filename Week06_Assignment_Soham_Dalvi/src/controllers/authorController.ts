import { Request, Response } from 'express';
import * as authorService from '../services/authorService';


export async function getAuthors (req: Request, res: Response) {
  try {
    const authors = await authorService.getAuthors();
    res.json(authors);
  } catch (error) {
   throw error;
  }
};

export async function getAuthorById (req: Request, res: Response) {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author){
       return res.send('Author not found' );
      }
    res.json(author);
  } catch (error) {
   throw error;
  }
};

export async function createAuthor (req: Request, res: Response) {
  try {
    const author = await authorService.createAuthor(req.body);
    res.json(author);
  } catch (error) {
   throw error;
  }
};

export async function updateAuthor  (req: Request, res: Response){
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    if (!author) return res.send( 'Author not found' );
    res.json(author);
  } catch (error) {
   throw error;
  }
};

export async function deleteAuthor (req: Request, res: Response) {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.send('Author deleted ');
  } catch (error) {
   throw error;
  }
};
