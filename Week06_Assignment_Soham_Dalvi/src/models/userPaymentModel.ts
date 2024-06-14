import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import { Contract } from './contractModel';
import { Address } from './addressModel';
import { BankDetails } from './bankDetailModel';



class Account extends Model {
    public id!: string;
    public userId!: string;
    public name!: string;
    public email!: string;
    public bankDetailsUId?: string;
    public addressUId?: string;
}


Account.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankDetailsUId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Bank_Details',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        addressUId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Addresses',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
    },
    {
        sequelize,
        tableName: 'Accounts',
    }
);


Account.hasMany(Contract, { foreignKey: 'accountUId' });
Contract.belongsTo(Account, { foreignKey: 'accountUId' });
Account.belongsTo(Address, { foreignKey: 'addressUId' });
Account.belongsTo(BankDetails, { foreignKey: 'bankDetailsUId' });

export { Account };