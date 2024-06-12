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
      return false;  // nopee
    }
};

export const isAdmin = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return false; // No token 
    }

    try {
      const decoded : any = jwt.verify(token, credentials.jwt.SECRET);
      
      console.log("\n\n",decoded, "\n\n");
       console.log(decoded.role,"\n\n");
      return decoded.role === 'admin'; // Check if the user is an admin

    } catch (err) {
      return false;  //invalid token
    }
};

//------------------------------------------------------------------------------------------
export const isUser = (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return false; // No token 
  }

  try {
    const decoded : any = jwt.verify(token, credentials.jwt.SECRET);
    
    console.log("\n\n",decoded, "\n\n");
    return decoded.role === 'user'; //  if the user is an user
  } catch (err) {
    return false;  //invalid token
  }
};

//--------------------------------------------------------------------------------------------

export const isAuthor = (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return false; // No token 
  }

  try {
    const decoded : any = jwt.verify(token, credentials.jwt.SECRET);
    
    console.log("\n\n",decoded, "\n\n");
    return decoded.role === 'author'; //  if the user is an author
  } catch (err) {
    return false;  //invalid token
  }
};

