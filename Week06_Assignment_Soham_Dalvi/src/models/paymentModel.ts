import { DataTypes, Model } from 'sequelize'
import sequelize from '../postgresDB/pgConfig';




class Payment extends Model {
    public id?: string
    public userId !: string
    public bookId !: string
    public amount !: number
    public status !: string
}


Payment.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status : {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        sequelize,
        tableName: 'Payments',
    }
)


export {
    Payment
}