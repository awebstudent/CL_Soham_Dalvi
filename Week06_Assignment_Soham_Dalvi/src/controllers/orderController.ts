import { Request, Response } from 'express';
import Order  from '../models/orderModel';

export async function createOrder (req: Request, res: Response){
 
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (error) {
    throw error;
  }
};

export async function getOrderById (req: Request, res: Response){
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      res.json(order);
    } else {
      res.json({ message: 'Order not found.' });
    }
  } catch (error) {
    throw error;
  }
};
