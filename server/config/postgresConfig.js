import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const postgresConfig = new Sequelize(
    process.env.DB_TEST_NAME,
    process.env.DB_TEST_USER,
    process.env.DB_TEST_PASS, {
      host: process.env.DB_TEST_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false
    });

export default postgresConfig;
