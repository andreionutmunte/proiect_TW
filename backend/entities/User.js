import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js'

const User = sequelize.define("Users", {
    UserID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    UserName:{
        type: Sequelize.STRING,
        allowNull: false
    },

    UserEmail:{
        type: Sequelize.STRING,
        allowNull: false
    },

    UserPassword:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default User;