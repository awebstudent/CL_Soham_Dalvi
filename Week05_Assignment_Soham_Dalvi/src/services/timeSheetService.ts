import Timesheet from '../models/timeSheetModel';

export async function createTimesheetEntry(
 data : any
)  {
  console.log("\n\n",data,"\n\n");
  const timesheet = await Timesheet.create(data);
  return timesheet;
};

export async function  getAllTimesheets(){
    const timesheets = await Timesheet.findAll();
    return timesheets;
  };