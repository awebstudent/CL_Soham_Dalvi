import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import credentials from './common/credentials';

export const authenticateToken = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return false; // No token --- return false
    }
  
    try {
      jwt.verify(token, credentials.jwt.SECRET);
      return true; // Valid token  return true
    } catch (err) {
      return false;  //invalid token
    }
  };