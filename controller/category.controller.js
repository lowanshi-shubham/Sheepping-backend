// import "../models/connection.js";
// import url from 'url';
// import path from 'path';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// import CategorySchemaModel from "../models/category.model.js";

// export const save=async(req,res)=>{
//  const category=await CategorySchemaModel.find();
//  const l=category.length;
//  const _id=l==0?1:category[l-1]._id+1;

//  //to get file & to move in specific folder
//  const caticon=req.files.caticon;
//  const caticonnm=Date.now()+"-"+caticon.name;
//  const uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/categoryicons",caticonnm);
//  caticon.mv(uploadpath);

//  const cDetails={...req.body,'_id':_id,"caticonnm":caticonnm};
//  try{
//     await CategorySchemaModel.create(cDetails);
//     res.status(201).json({"status":true});
//  }
//  catch(error){
//     res.status(500).json({"status":false});
//  }
// };



import CategorySchemaModel from "../models/category.model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ✅ __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const save = async (req, res) => {
  try {
    // ✅ Body validation
    if (!req.body.catnm) {
      return res.status(400).json({ status: false, message: "Category name required" });
    }

    // ✅ File validation
    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ status: false, message: "Category icon required" });
    }

    // ✅ Auto ID logic
    const category = await CategorySchemaModel.find();
    const l = category.length;
    const _id = l === 0 ? 1 : category[l - 1]._id + 1;

    // ✅ File handling
    const caticon = req.files.caticon;
    const caticonnm = Date.now() + "-" + caticon.name;

    const uploadDir = path.join(__dirname, "../uploads/categoryicons");

    // ✅ Folder auto-create
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, caticonnm);

    // ✅ Await added (important)
    await caticon.mv(uploadPath);

    // ✅ Mongo save
    const cDetails = {
      ...req.body,
      _id: _id,
      caticonnm: caticonnm
    };

    await CategorySchemaModel.create(cDetails);

    return res.status(201).json({ status: true, message: "Category saved successfully" });

  } catch (error) {
    console.error("❌ CATEGORY SAVE ERROR:", error);
    return res.status(500).json({ status: false, error: error.message });
  }
};


export const fetch=async(req,res)=>{
   var condition_obj=url.parse(req.url,true).query.condition_obj;
   console.log(condition_obj)
   if(condition_obj!=undefined)
    condition_obj=JSON.parse(condition_obj); 
   else
    condition_obj={};  
   var cList=await CategorySchemaModel.find(condition_obj);
  //  console.log(cList)
   if(cList.length!=0)
     res.status(200).json(cList);
   else
     res.status(404).json({"status":"Resource not found"}); 
  };

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
   
