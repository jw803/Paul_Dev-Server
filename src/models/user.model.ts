import { Model, DataTypes } from 'sequelize';
import database from './database';

export default class User extends Model {
    public id!: number;

    public name!: string;

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
        sequelize: database // this bit is important
    }
);

User.sync({ force: true }).then(() => console.log('User table created'));
