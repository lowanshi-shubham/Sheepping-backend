import "../models/connection.js";
import url from 'url';
import jwt from "jsonwebtoken";
import rs from "randomstring";
import bcrypt from "bcrypt"
import sendMail from "./email.controller.js";

import UserSchemaModel from "../models/user.model.js";

export const save=async(req,res)=>{
 const users=await UserSchemaModel.find();
 const l=users.length;
 const _id=l==0?1:users[l-1]._id+1;
 const password =rs.generate({length:8,charset:'alphanumeric'})
 console.log(password)
//  const hendelPassword =await bcrypt.hash(password,10);
 const userDetails={...req.body, 'password':password, '_id':_id,'status':0,'role':'user','info':Date()};
 
 try{
    await UserSchemaModel.create(userDetails);
    sendMail(userDetails.email,password);
    res.status(201).json({"status":true});
 }
 catch(error){
  console.log(error)
    res.status(500).json({"status":false});
 }
};

export const fetch=async(req,res)=>{
   var userList=await UserSchemaModel.find(req.query);
   if(userList.length!=0)
     res.status(200).json(userList);
   else
     res.status(404).json({"status":"Resource not found"});
  };

  export var deleteUser=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    let userDetails = await UserSchemaModel.findOne(obj); //findOneAndDelete
    if(userDetails){
       let user=await UserSchemaModel.deleteOne(obj);   
       if(user)
         res.status(200).json({"status":"OK"});
       else
         res.status(500).json({"status": "Server Error"});
      }
    else
     res.status(404).json({"status":"Requested resource not available"});
   } 
   else
    res.status(500).json({"status": "Please enter valid condition"});
   };


   export var update=async(req,res)=>{
      var obj=req.body;
      if(obj!=undefined)
      {
         let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
         if(userDetails){
             let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
             if(user)
               res.status(200).json({"msg":"OK"});
             else
               res.status(500).json({"status": "Server Error"});
         }
         else
           res.status(404).json({"status":"Requested resource not available"});   
      }
      else
        res.status(500).json({"status": "Please enter valid condition"});
   };
   
   
 
   export const login=async(req,res)=>{
    try {
    // const orgPassword = await bcrypt.compare("req.body.password",10)
    // console.log(orgPassword)
// console.log(req.body)
    const {email,password} = req.body
    var condition_obj={email:email,password:password, "status":1};
    console.log(condition_obj)
    var user=await UserSchemaModel.findOne(condition_obj);
    console.log(user)
    if(!user) return res.status(404).json({message:"invailid email or password"});

    // console.log(user.password)

      const payload=user.email; 
      const key=rs.generate(50);
      const token = jwt.sign(payload,key); 
      res.status(200).json({"token":token,"userDetails":user});  
    } catch (error) {
      console.log(error);
      
      res.status(500).json({"token":"error"}); 
    }
    
  };







  
  //  export const login=async(req,res)=>{
  //   const orgPassword = await bcrypt.compare("req.body.password",10)
  //   // console.log(orgPassword)

  //   var condition_obj={...req.body, "password":orgPassword,"status":1};
  //   var userList=await UserSchemaModel.find(condition_obj);
  //   console.log(userList.password)
  //   if(userList.length!=0)
  //   {
  //     const payload=userList[0].email; 
  //     const key=rs.generate(50);
  //     const token = jwt.sign(payload,key); 
  //     res.status(200).json({"token":token,"userDetails":userList[0]});
  //   }
  //   else
  //   {
  //     res.status(500).json({"token":"error"}); 
  //   }   
  // };





//    export const login=async(req,res)=>{
//     // const orgPassword = await bcrypt.compare("req.body.password",10)
//     // console.log(orgPassword)

//     var condition_obj={ email:req.body.email,status:1};
//     // console.log(condition_obj)
//     var userList=await UserSchemaModel.findOne(condition_obj);

// //     console.log("Entered password:", req.body.password);
// // console.log("User found:", userList);
// // console.log("User password (hashed):", userList?.password);


//     const p = await bcrypt.compare(req.body.password,userList.password);
//     console.log(p)
//     // console.log(userList)
//     if(p==true)
//     {
//       const payload={email:userList.email}; 
//       const key=rs.generate(50);
//       const token = jwt.sign(payload,key); 
//       res.status(200).json({"token":token,"userDetails":userList});
//     }
//     else
//     {
//       res.status(500).json({"token":"error"}); 
//     }   
//   };