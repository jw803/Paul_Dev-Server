import { Sequelize } from 'sequelize';
import config from '../config';

const database = new Sequelize({
    host: config.DBHOST,
    database: 'chuBunny',
    dialect: 'mysql',
    username: 'admin',
    password: 'abc123321',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default database;
