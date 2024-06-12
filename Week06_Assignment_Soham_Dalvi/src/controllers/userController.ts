import { Request, Response } from 'express';
import * as userService from '../services/userService';


export async function  registerUser (req: Request, res: Response){
  try {
    const user = await userService.registerUser(req.body);
    res.json(user);
  } catch (error) {
    throw error;
  }
};

export async function loginUser (req: Request, res: Response){
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.json({ user, token });
  } catch (error) {
    throw error;
  }
};

export async function getUserById (req: Request, res: Response){
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user){
      return res.json({ msg : 'User not found' });
    }
    res.json(user);
  } catch (error) {
    throw error;
  }
};
