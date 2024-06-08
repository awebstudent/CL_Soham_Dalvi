import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';


class SOWPaymentPlanItem extends Model {
  public id!: string;
  public sowPaymentPlanId!: string;
  public sowId!: string;
  public orderId!: string;
  public particular!: string;
  public rate!: number;
  public unit!: number;
  public total!: number;
}

SOWPaymentPlanItem.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  sowPaymentPlanId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sowId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  particular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'SOWPaymentPlanItems',
  timestamps: false,
});



export default SOWPaymentPlanItem;
