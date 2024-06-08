import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';

class SOWPaymentPlan extends Model {
  public id!: string;
  public sowId!: string;
  public customerId!: string;
  public plannedInvoiceDate!: Date;
  public totalActualAmount!: number;
}

SOWPaymentPlan.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  sowId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plannedInvoiceDate: {
    type: DataTypes.DATE,
    allowNull: false,
    
  },
  totalActualAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'SOWPaymentPlans',
  timestamps: false,
});

export default SOWPaymentPlan;
