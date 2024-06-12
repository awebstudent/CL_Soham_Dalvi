import { Model, DataTypes } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';

class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public role! : string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'author', 'user'), 
    defaultValue : 'user',
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;

