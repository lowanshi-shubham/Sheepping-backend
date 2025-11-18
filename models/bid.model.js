import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const BidSchema=mongoose.Schema({
    _id:Number,
    p_id:Number,
    bidprice:Number,
    u_id:String,
    info:String
});

BidSchema.plugin(uniqueValidator);

const BidSchemaModel=mongoose.model('bid_collection',BidSchema)

export default BidSchemaModel