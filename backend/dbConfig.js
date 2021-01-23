import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'mssql',
    database: 'Proiect_TW ',
    username: 'sa',
    host: 'localhost',
    port: '55892',
    password: '1234',
    validateBulkLoadParameters: true,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default sequelize;