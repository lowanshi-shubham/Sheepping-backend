import "../models/connection.js";
import url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//import CategorySchemaModel from "../models/category.model.js";
import ShipmentSchemaModel from "../models/shipment.model.js";

export const save=async(req,res)=>{
   try{
 const shipment=await ShipmentSchemaModel.find();
 const l=shipment.length;
 const _id=l==0?1:shipment[l-1]._id+1;

 //to get file & to move in specific folder
 const shipmenticon=req.files.producticon;
 const shipmenticonnm=Date.now()+"-"+shipmenticon.name;
 const uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/shipmenticons",shipmenticonnm);
 shipmenticon.mv(uploadpath);

 const shipmentDescription=req.files.description;
//  console.log(shipmentDescription)
 const shipmentDescriptionnm=Date.now()+"-"+shipmentDescription.name
 const D_uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/shipmentDescription",shipmentDescriptionnm)
shipmentDescription.mv(D_uploadpath);


 const sDetails={...req.body,'_id':_id, "description":shipmentDescriptionnm, "piconnm":shipmenticonnm,"auctionprice":req.body.baseprice,"info":Date()};
    await ShipmentSchemaModel.create(sDetails);
    res.status(201).json({"status":true});
 }
 catch(error){
   console.log(error)
    res.status(500).json({"status":false});
 }
};


export const fetch = async (req, res) => {

  // ✅ Get all query parameters as a plain object
  let condition_obj = url.parse(req.url, true).query;
  console.log(condition_obj); // Example: { _id: '12345' }

  // ❌ DO NOT PARSE AGAIN
  // if (condition_obj != undefined)
  //   condition_obj = JSON.parse(condition_obj);

  // ✅ Just ensure it's not null or undefined
  if (!condition_obj) {
    condition_obj = {};
  }

  try {
    const sList = await ShipmentSchemaModel.find(condition_obj);

    if (sList.length !== 0) {
      res.status(200).json(sList);
    } else {
      res.status(404).json({ status: "Resource not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Server error", error: err.message });
  }
};
