import Order  from '../models/orderModel';
//import { Payment } from '../models/paymentModel';
import   User from '../models/userModel';
import  Book  from '../models/bookModel';

export const createOrder = async (data: any) => {
  return await Order.create(data);
};

export const getOrderById = async (id: string) => {
  return await Order.findByPk(id);
};




