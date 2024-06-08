import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';

class Customer extends Model {
  public id!: string;
  public organizationId!: string;
  public msaValidFrom!: Date;
  public msaValidUpto!: Date;
  public legalName!: string;
  public ndaSignedOn!: Date;
  public shortName!: string;
  public ndaValidFrom!: Date;
  public ndaValidUpto!: Date;
  public addressId!: string;
  public displayName!: string;
  public isNdaSigned!: boolean;
  public isMsaSigned!: boolean;
  public msaSignedOn!: Date;
}

Customer.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  organizationId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  msaValidFrom: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  msaValidUpto: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  legalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ndaSignedOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ndaValidFrom: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ndaValidUpto: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isNdaSigned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isMsaSigned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  msaSignedOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Customers',
  timestamps: false,
});

export default Customer;


/*   Sample input for model testing as
{
 "id": "CLI_001",
 "organizationId": "ORG_001", // Referenced to Organization table
 "msaValidFrom": "2024-03-10",
 "msaValidUpto": "2025-01-10",
 "legalName": "AmperX Pvt. Ltd.",
 "ndaSignedOn": "2024-03-10",
 "shortName": "Amperx",
 "ndaValidFrom": "2024-01-10",
 "ndaValidUpto": "2025-01-10",
 "addressId": "ADDRESS_ID_001", // Referenced to Address table
 "displayName": "Centra APIs Organization",
 "isNdaSigned": true,
 "isMsaSigned": true,
 "msaSignedOn": "2024-03-10"
}

*/