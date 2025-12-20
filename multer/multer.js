// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";

// const storage = new CloudinaryStorage(
//   {
//   cloudinary,
//   params: {
//     folder: "products",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// export const upload = multer({ storage });


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// 🔹 Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    // file type check
    let resourceType = "image";

    if (file.mimetype === "application/pdf") {
      resourceType = "raw"; // PDFs ke liye
    }

    return {
      folder: "products",
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`
    };
  },
});

// 🔹 Multer config
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // ✅ 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images & PDF files are allowed"), false);
    }
  }
});
