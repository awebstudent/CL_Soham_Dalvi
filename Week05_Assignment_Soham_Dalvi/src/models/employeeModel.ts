import { Model, DataTypes } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';

class Employee extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public assignedShiftHours!: number;
  public role!: string;
}

Employee.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedShiftHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('SuperAdmin', 'Manager', 'Employee'), //this means only out of the three options
    defaultValue : 'Employee',
    allowNull: false,
  },
}, {
  sequelize,
 timestamps : false,
});

export default Employee;
