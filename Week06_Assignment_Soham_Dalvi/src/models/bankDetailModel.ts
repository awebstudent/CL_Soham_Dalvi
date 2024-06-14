import { Model, DataTypes } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';


class BankDetails extends Model{
    public id!: string;
    public userId!: string;
    public accountNumber!: string;
    public accountName!: string;
    public bankAddress!: string;
    public sortCode!: string;
}


BankDetails.init(
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
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sortCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Bank_Details'

    }
);

export { BankDetails };