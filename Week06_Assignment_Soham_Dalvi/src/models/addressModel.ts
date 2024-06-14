import { DataTypes, Model } from 'sequelize'
import sequelize from '../postgresDB/pgConfig';




class Address extends Model {
    public id!: string;
    public userId!: string;
    public line1!: string;
    public line2!: string;
    public city!: string;
    public postalCode!: string;
}


Address.init(
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
        line1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        line2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        
        timestamps: true,

    }
);

export { Address };