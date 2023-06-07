const Sequelize=require('sequelize');
const sequelize=require('../utils/db.js');

const User= sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    course:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
    fee:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports=User;