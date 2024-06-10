import { Model, DataTypes } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import Employee from './employeeModel';

class Shift extends Model {
  public id!: string;
  public employeeId!: string;
  public startTime!: Date;
  public endTime!: Date | null;
  public actualHours!: number;
}

Shift.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  actualHours: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  sequelize,
  timestamps: false, 
});

Employee.hasMany(Shift, { foreignKey: 'employeeId' });
Shift.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Shift;
