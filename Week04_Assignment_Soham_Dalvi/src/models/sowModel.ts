import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';

class SOW extends Model {
  public id!: string;
  public invoiceEmailAddresses!: string[];
  public customerId!: string;
  public customerPONumber!: string;
  public title!: string;
  public customerSONumber!: string;
  public validityPeriod!: object;
  public totalValue!: number;
  public currency!: string;
}

SOW.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  invoiceEmailAddresses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPONumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerSONumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validityPeriod: {  // unsure of what dataype to use, i am using json here (searched on internet)
    type: DataTypes.JSON,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'SOWs',
  timestamps: false,
});

export default SOW;

/* Sample input for sow creation
{
  "id": "SOW_001",
  "invoiceEmailAddresses": ["billing@customer.com", "accounts@customer.com"],
  "customerId": "CUST_001",
  "customerPONumber": "PO_123456",
  "title": "Web Development Project",
  "customerSONumber": "SO_654321",
  "validityPeriod": {
    "validFrom": "2024-03-10",
    "validUpto": "2025-01-10"
  },
  "totalValue": 3000,
  "currency": "USD"
}


*/