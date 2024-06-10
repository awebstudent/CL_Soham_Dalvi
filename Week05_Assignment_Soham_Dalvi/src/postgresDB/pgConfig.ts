import { Sequelize } from 'sequelize';
import credentials from '../common/credentials';

const sequelize = new Sequelize({
  username: credentials.postgres.USERNAME,
  password: credentials.postgres.PASSWORD,
  database: credentials.postgres.DATABASE,
  host: credentials.postgres.HOST,
  port: credentials.postgres.DBPORT,
  dialect: 'postgres',
  // toggling this option since i am unable to toggle ssl settings on pgAdmin4.
  // otherwise , on terminal --> Error : Server doesn't support SSL connections
//   dialectOptions: { 
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((err) => {
    console.error('Unable to synchronize models with the database:', err);
  });

export default sequelize;
