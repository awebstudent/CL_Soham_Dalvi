import { Request, Response } from 'express';
import * as reviewService from '../services/reviewService';

export async function getReviewsByBookId  (req: Request, res: Response){
  try {
    const reviews = await reviewService.getReviewsByBookId(req.params.bookId);
    res.json(reviews);
  } catch (error) {
    throw error;
  }
};

export async function createReview  (req: Request, res: Response) {
  try {
    const bookId = req.params.bookId;
    const data = {...req.body,bookId}
    const review = await reviewService.createReview(data);
    res.status(201).json(review);
  } catch (error) {
    throw error;
  }
};

export async function deleteReview  (req: Request, res: Response)  {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(204).end();
  } catch (Error) {
    throw Error;
  }
};
