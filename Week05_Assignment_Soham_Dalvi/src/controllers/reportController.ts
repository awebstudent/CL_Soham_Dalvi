import { Request, Response } from 'express';
import { generateEmployeeReport } from '../services/reportService';

export const getReport = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const report = await generateEmployeeReport(employeeId);
    res.json(report);
  } catch (error) {
   throw error;
  }
};

