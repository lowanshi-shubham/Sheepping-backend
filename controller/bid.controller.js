import '../models/connection.js'
import url from "url";
import path from 'path'

import BidSchemaModel from '../models/bid.model.js'

export const save = async(req , res)=>{
    const bidList = await BidSchemaModel.find();
    const l =bidList.length;
    const _id=l==0?1:bidList[l-1]._id+1;

    const bidDetails ={...req.body,"_id":_id,"info":Date()};
    try{
        await BidSchemaModel.create(bidDetails);
        res.status(201).json({"status":true});

    }catch(erroe){
        res.status(500).json({"status":false})

    }
};


export const fetch=async(req,res)=>{
  const condition_obj=url.parse(req.url,true).query;    
  const bidList=await BidSchemaModel.find(condition_obj);
  if(bidList.length!=0)
    res.status(200).json(bidList);
  else
    res.status(404).json({"status":"Resource not found"});
};



export const fetchById = async (req, res) => {
  const { id } = req.params;
  console.log("fetch by id bid product")
  
  try {
    const highestBid = await BidSchemaModel
      .findOne({ p_id: id })
      .sort({ bidprice: -1 }); // Highest bid first

    if (highestBid)
      res.status(200).json(highestBid);
    else
      res.status(404).json({ status: "Resource not found" });

  } catch (error) {
    res.status(500).json({ status: "Server error", error: error.message });
  }
};
