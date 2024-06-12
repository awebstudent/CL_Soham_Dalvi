import { Router } from 'express';
import * as authorController from '../controllers/authorController';
import * as bookController from '../controllers/bookController';
import * as orderController from '../controllers/orderController';
import * as reviewController from '../controllers/reviewController';
import * as ratingController from '../controllers/ratingController';
import * as userController from '../controllers/userController';
import { authenticateToken, isAdmin, isAuthor, isUser } from '../jsonVerify';

const router = Router();


// User endpoints______________(tested)_________________________________________________________________________________________________________________-

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users/:id', (req, res) => {
  if (authenticateToken(req, res)) {
    userController.getUserById(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

// Author endpoints ______________(tested)_____________________________________________________________________________________________

router.get('/authors', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    authorController.createAuthor(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});
router.put('/authors/:id', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    authorController.updateAuthor(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});
router.delete('/authors/:id', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    authorController.deleteAuthor(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});

// Book endpoints___________________(tested)________________________________________________________________________________________________

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    bookController.createBook(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});
router.put('/books/:id', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    bookController.updateBook(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});
router.delete('/books/:id', (req, res) => {
  if (authenticateToken(req, res) && isAdmin(req, res)) {
    bookController.deleteBook(req, res);
  } else {
    return res.send('Unauthorized or insufficient permissions');
  }
});

// Payment endpoints______________________(Tested)_________________________________________________________________________________________________

router.post('/orders', (req, res) => {
  if (authenticateToken(req, res) && isUser(req,res)) {
    orderController.createOrder(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});
router.get('/orders/:id', (req, res) => {
  if (authenticateToken(req, res) && isUser(req,res)) {
    orderController.getOrderById(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

// Review routes_______________________(Tested)_____________________________________________________________________________________________________

router.get('/books/:bookId/reviews', reviewController.getReviewsByBookId);
router.post('/books/:bookId/reviews', (req, res) => {
  if (authenticateToken(req, res)) {
    reviewController.createReview(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});
router.delete('/reviews/:id', (req, res) => {
  if (authenticateToken(req, res) && (isAdmin(req,res) || isAuthor(req,res))) {
    reviewController.deleteReview(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

// Rating endpoints_________________________________(Tested)___________________________________________________________________________________________

router.get('/books/:bookId/ratings', ratingController.getRatingsByBookId);
router.post('/books/:bookId/ratings', (req, res) => {
  if (authenticateToken(req, res) ) {
    ratingController.createRating(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});



export default router;
