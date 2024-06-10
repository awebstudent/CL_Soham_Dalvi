import { Request, Response } from 'express';
import { startEmployeeShift, endEmployeeShift } from '../services/shiftService';

export async function startShift  (req: Request, res: Response) {
  try {
    const { employeeId } = req.body;
    const shift = await startEmployeeShift(employeeId);
    console.log("Shift create successful");
    res.json(shift);
  } catch (error) {
   throw error;
  }
};

export  async function endShift  (req: Request, res: Response) {
  try {
    const { employeeId } = req.body;
    const shift = await endEmployeeShift(employeeId);
    res.status(200).json(shift);
  } catch (error) {
   throw error;
  }
};
