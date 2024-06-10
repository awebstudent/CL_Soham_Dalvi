import { Request, Response } from 'express';
import { createTimesheetEntry, getAllTimesheets } from '../services/timeSheetService';

export async function createTimesheet (req: Request, res: Response) {
  try {
      console.log("\n",req.body,"\n");
    const timesheet = await createTimesheetEntry(req.body);
    res.json(timesheet);
  } catch (error) {
    throw error;
  }
};

export async function getTimesheets (req: Request, res: Response)  {
  try {
    const timesheets = await getAllTimesheets();
    res.json(timesheets);
  } catch (error) {
    throw error;
  }
};