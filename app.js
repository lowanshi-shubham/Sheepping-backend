

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

// Routers
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ShipmentRouter from './routes/shipment.router.js'
import BidRouter from './routes/bid.router.js'

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload
// app.use(fileUpload());

// ✅ ✅ ✅ PERFECT CORS CONFIG ✅ ✅ ✅
app.use(cors({
  origin: ["https://shippingwar.vercel.app","http://localhost:5173"],   // ✅ Sirf frontend allow
  methods: ["GET", "POST", "PUT", "DELETE" ,"PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routers
app.use("/user", UserRouter);
app.use("/category", CategoryRouter);
app.use("/subcategory", SubCategoryRouter);
app.use("/shipment", ShipmentRouter);
app.use("/bid", BidRouter);

// ✅ ✅ ✅ RENDER PORT FIX (MOST IMPORTANT) ✅ ✅ ✅
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});