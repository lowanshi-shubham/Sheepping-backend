import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

// ✅ File upload first
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
app.use(cors({
  origin: "https://shippingwar.vercel.app",
  credentials: true,
}));

// Routes
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
