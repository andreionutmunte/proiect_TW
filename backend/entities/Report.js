import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js'

const Report = sequelize.define("Reports", {
    ReportId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ReportDate:{
        type: Sequelize.STRING,
        allowNull: false
    },

    ReportDescription:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    UserId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Report;