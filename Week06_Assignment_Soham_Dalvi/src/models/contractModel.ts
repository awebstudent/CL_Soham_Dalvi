import { DataTypes, Model } from 'sequelize'
import sequelize from '../postgresDB/pgConfig';





class Contract extends Model {
    public id!: string;
    public userId!: string;
    public mpan!: string;
    public startDate!: Date;
    public endDate!: Date;
    public accountUId!: string;
    public active!: boolean;
    public archived!: boolean;
    public paymentDate!: Date;
    public isPaymentInitiated!: boolean;
}


Contract.init(
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
        mpan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        accountUId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isPaymentInitiated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Contracts',

    }
);

export { Contract };