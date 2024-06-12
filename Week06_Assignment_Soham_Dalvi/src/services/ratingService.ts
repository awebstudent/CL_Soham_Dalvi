import Rating from '../models/ratingModel';


export const getRatingsByBookId = async (bookId: string) => {
  return await Rating.findAll({ where: { bookId } });
};

export const createRating = async (data: any) => {
  return await Rating.create(data);
};
