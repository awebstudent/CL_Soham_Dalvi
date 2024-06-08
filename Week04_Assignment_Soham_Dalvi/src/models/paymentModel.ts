import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';

class Payment extends Model {
  public id!: string;
  public paymentDate!: Date;
  public foreignExchangeAmount!: number;
  public currency!: string;
  public indianAmount!: number;
  public invoiceId!: string;
  public isFullPayment!: boolean;
  public bankPaymentDetails!: string;
}

Payment.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  foreignExchangeAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  indianAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  invoiceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFullPayment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  bankPaymentDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Payments',
  timestamps: false,
});

export default Payment;
