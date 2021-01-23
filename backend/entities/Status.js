import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js'

const Status = sequelize.define("StatusBug", {
    StatusId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    StatusText:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
})

export default Status;