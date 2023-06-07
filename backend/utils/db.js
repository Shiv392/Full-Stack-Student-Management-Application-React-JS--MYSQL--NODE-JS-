const Sequelize= require('sequelize');

const sequelize= new Sequelize('curd_full_stack','root','Shiv@3923',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;