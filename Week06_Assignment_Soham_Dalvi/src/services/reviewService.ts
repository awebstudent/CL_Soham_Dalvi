import  Review  from '../models/reviewModel';




export const getReviewsByBookId = async (bookId: string) => {
  return await Review.findAll({ where: { bookId } });
};

export const createReview = async (data: any) => {
  return await Review.create(data);
};

export const deleteReview = async (id: string) => {
  const review = await Review.findByPk(id);
  if (!review) throw new Error('Review not found');
  return await review.destroy();
};

