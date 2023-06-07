const express=require('express');
const routes= express.Router();
const user= require('../controllers/user');

routes.get('/user',user.getUser);
routes.post('/user',user.adduser);
routes.delete('/user/delete/:id',user.deleteuser);
routes.put('/user/update/:id',user.updateuser);
module.exports=routes;