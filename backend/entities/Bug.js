import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js'

const Bug = sequelize.define("Bugs", {
    BugId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    BugName:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugSeverity:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugPriority:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugDescription:{
        type: Sequelize.STRING,
        allowNull: false
    },

    BugLink:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Bug;