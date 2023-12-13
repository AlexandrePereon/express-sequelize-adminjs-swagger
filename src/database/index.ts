import { Sequelize, type Dialect } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const database = new Sequelize({
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    logging: false,
    define: {
        underscored: true,
        timestamps: true,
        paranoid: true,
    },
})
