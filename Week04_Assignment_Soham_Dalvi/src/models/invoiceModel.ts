import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';

class Invoice extends Model {
  public id!: string;
  public sowId!: string;
  public totalInvoiceAmount!: number;
  public status!: string;
  public invoiceSentOn!: Date;
  public customerId!: string;
  public paymentReceivedOn!: Date | null;
  public invoiceVersionNumber!: number;
}

Invoice.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  sowId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalInvoiceAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Drafted',
  },
  invoiceSentOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentReceivedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  invoiceVersionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  tableName: 'Invoices',
  timestamps: false,
});

export default Invoice;
