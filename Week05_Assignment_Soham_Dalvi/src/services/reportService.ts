import Shift from '../models/shiftModel';
import Timesheet from '../models/timeSheetModel';

export const generateEmployeeReport = async (employeeId: string) => {
  const shifts = await Shift.findAll({ where: { employeeId } });
  const timesheets = await Timesheet.findAll({ where: { employeeId } });

  const report = {
    shifts,
    timesheets,
  };

  return report;
};
