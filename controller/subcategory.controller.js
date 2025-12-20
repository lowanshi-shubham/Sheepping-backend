import "../models/connection.js";


import SubCategorySchemaModel from "../models/subcategory.model.js";

export const save=async(req,res)=>{
  try{
  console.log(req.body);
  if (!req.body.subcatnm) {
      return res.status(400).json({
        status: false,
        message: "Category name required"
      });
    }

     if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Category icon required"
      });
    }
 const subcategory=await SubCategorySchemaModel.find();
 const l=subcategory.length;
 const _id=l==0?1:subcategory[l-1]._id+1;

 //to get file & to move in specific folder
 const caticon=req.file.path;

 const scDetails={...req.body,'_id':_id,"subcaticonnm":caticon};
    await SubCategorySchemaModel.create(scDetails);
    res.status(201).json({"status":true});
 }
 catch(error){
  console.log(error);
    res.status(500).json({"status":false});
 }
};

export const fetch=async(req,res)=>{
   var scList=await SubCategorySchemaModel.find(req.query);
   console.log(scList)
   if(scList.length!=0)
     res.status(200).json(scList);
   else
     res.status(404).json({"status":"Resource not found"}); 
  };
/*
 export var deleteCategory=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    var condition_obj=JSON.parse(req.body.condition_obj); 
    let cDetails = await CategorySchemaModel.findOne(condition_obj);
    if(cDetails){
       let category=await CategorySchemaModel.deleteOne(condition_obj);   
       if(category)
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
         let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
         if(cDetails){
             let category=await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
             if(category)
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
*/   
