import { DataTypes, Model } from 'sequelize';
import sequelize from './pgConfig';

class Weather extends Model {
  public id!: number;
  public city!: string;
  public country!: string;
  public weather!: string; 
  public time!: Date;
  public longitude!: number;
  public latitude!: number;
}

Weather.init(
  {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Weather',
    timestamps : false
  }
);

export default Weather;
