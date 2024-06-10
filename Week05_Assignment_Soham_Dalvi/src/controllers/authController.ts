import { Request, Response } from 'express';
import { registerEmployee, loginEmployee } from '../services/authService';
import { startEmployeeShift } from '../services/shiftService';
export async function register (req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const employee = await registerEmployee(name, email, password);
    res.json(employee);
  } catch (error) {
   throw error;
  }
};

export async function login (req: Request, res: Response)  {
  try {
    const { email, password,employeeId } = req.body;
    const token = await loginEmployee(email, password);
    const shiftCreate = await startEmployeeShift(employeeId); //automatic shift start
    res.json({token,shiftCreate});
    
  } catch (error) {
   throw error;
  }
};
