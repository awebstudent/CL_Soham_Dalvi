import { Request, Response } from 'express';
import * as ratingService from '../services/ratingService';


export async function getRatingsByBookId  (req: Request, res: Response){
  try {
    const ratings = await ratingService.getRatingsByBookId(req.params.bookId);
    res.json(ratings);
  } catch (error) {
    throw error;
  }
};

export async function createRating  (req: Request, res: Response){
  try {
    const bookId = req.params.bookId;
    const data = {...req.body,bookId}
    const rating = await ratingService.createRating(data);
    res.status(201).json(rating);
  } catch (error) {
    throw error;
  }
};
