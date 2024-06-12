import User from '../models/userModel';
import Book from '../models/bookModel';
import Author from '../models/authorModel';
import Review from '../models/reviewModel';
import Rating from '../models/ratingModel';
import Order from '../models/orderModel';


// Define relationships
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Order, { foreignKey: 'bookId' });
Order.belongsTo(Book, { foreignKey: 'bookId' });

Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

Book.hasMany(Rating, { foreignKey: 'bookId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });


Book.belongsToMany(Author, { through: 'BookAuthors', foreignKey: 'bookId' });
Author.belongsToMany(Book, { through: 'BookAuthors', foreignKey: 'authorId' });

export { User, Book, Author, Review, Rating, Order };
