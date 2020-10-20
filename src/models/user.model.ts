import { Model, DataTypes } from 'sequelize';
import database from './database';
import IUser from '../interface/IUser';

export default class User extends Model implements IUser {
    public _id!: string;

    public name!: string;

    public password!: string;

    public email!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: 'nodes',
        sequelize: database
    }
);

User.sync({ force: true }).then(() => console.log('User table created'));
