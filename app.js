import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
 //Routers 
   import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ShipmentRouter from './routes/shipment.router.js'
  import BidRouter from './routes/bid.router.js'
// ✅ File upload first


// ✅ Body parsers
console.log("middleware express.json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
console.log("cors run")
app.use(cors({ origin: "https://shippingwar.vercel.app", // ✅ Sirf frontend allow 
              methods: ["GET", "POST", "PUT", "DELETE"],
              allowedHeaders: ["Content-Type", "Authorization"], 
              credentials: true }));

// Routes
console.log("app.js routes run")
app.use("/user", UserRouter);
app.use("/category", CategoryRouter);
app.use("/subcategory", SubCategoryRouter);
app.use("/shipment", ShipmentRouter);
app.use("/bid", BidRouter);

// Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
