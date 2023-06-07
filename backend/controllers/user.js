const user= require('../models/user.js');

exports.getUser= async(req,res,next)=>{
 try{
    let users = await user.findAll();
    console.log(users);
    res.json({success:true,message:'all user',user:users})
 }
 catch(err){
    console.log('error while getin all user',err);
 }
}

exports.adduser= async(req,res,next)=>{
    try{
        const {name,course,fee}=req.body;
        let newUser= await user.create({
         name:name,
         course:course,
         fee:fee
        });
        console.log(newUser);
        res.status(201).json({success:true,message:'new user has been added',user:user})
    }
  catch(err){
    console.log(err);
   return res.status(409).json({success:false,message:'could not add new user',error:err})
  }
}
 exports.deleteuser= async(req,res)=>{
    try{
   let Id= req.params.id;
   let deleted= await user.destroy({where:{id:Id}});
   res.json({success:true,message:'user has been deleted',user:user});
    }
    catch(err){
   console.log('error while deleting user');
   res.json({success:false,message:'user could not be deleted'});
    }
 }

 exports.updateuser= async(req,res)=>{
    try{
    let {name,course,fee}=req.body;
    let Id= req.params.id;
    let updatedUser= await user.findByPk(Id);
    if(!updatedUser){
        return res.status(404).json({success:false,message:'user not found'})
    }
    await updatedUser.update({
        name:name,
        course:course,
        fee:fee
    })
    return res.status(200).json({success:true,messag:'user has been updated',user:updatedUser});
    }
    catch(err){
        console.log('error while updating',err);
        res.status(500).json({success:false,message:'could not updated user',error:err})
    }
 }