import * as dotenv from 'dotenv';
import Sequelize from "sequelize";

dotenv.config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

export default database;