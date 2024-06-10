import Shift from '../models/shiftModel';

export async function  startEmployeeShift (employeeId: string)  {
  const shift = await Shift.create({ employeeId, startTime: new Date() });
  return shift;
};


export async function endEmployeeShift (employeeId: string)  {
  const shift = await Shift.findOne({ where: { employeeId, endTime: null } });
  if (!shift) {
    throw new Error('No active shift found'); //active shift means that employes' endtime isn't specified
  }
  shift.endTime = new Date();
  shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000;
  await shift.save();
  return shift;
};

