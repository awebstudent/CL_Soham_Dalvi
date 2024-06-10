import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel';
import credentials from '../common/credentials';

export async function registerEmployee (name: string, email: string, password: string)  {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const employee = await Employee.create({ name, email, password: hashedPassword, assignedShiftHours: 8, role: 'Employee' });
  return employee;
};

export async function loginEmployee  (email: string, password: string)  {
  const employee = await Employee.findOne({ where: { email } });
  if (!employee || !await bcrypt.compare(password, employee.password)) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: employee.id, role: employee.role }, credentials.jwt.SECRET, { expiresIn: '10h' });
  return token;
};
