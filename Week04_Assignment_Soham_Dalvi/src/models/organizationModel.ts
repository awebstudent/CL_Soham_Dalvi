import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../postgresDB/pgConfig';
import Customer from './customerModel';

class Organization extends Model {
  public id!: string;
  public gstNo!: string;
  public panNo!: string;
  public legalOrganizationName!: string;
  public invoiceTemplateId!: string;
  public shortName!: string;
  public contactName!: string;
  public displayName!: string;
  public email!: string;
  public addressId!: string;
  public phone!: string;
}

Organization.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  gstNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  panNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  legalOrganizationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoiceTemplateId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Organizations',
  timestamps: false,
});

export default Organization;

/* Sample input for model testing
{
 "id": "ORG_002",
 "gstNo": "GST156565789",
 "panNo": "ADE551234F",
 "legalOrganizationName": "Maha_Govt_Ltd.",
 "invoiceTemplateId": "TPL_002",
 "shortName": "GovtAPIs",
 "contactName": "Soham Dalvi",
 "displayName": "CentraAPIs Pvt. Ltd.",
 "email": "info@mahagovt.com",
 "addressId": "ADDR_012",
 "phone": "+12345678910"
}
 */
