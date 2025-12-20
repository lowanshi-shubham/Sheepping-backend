import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";

    // PDFs / docs / txt → raw
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "text/plain" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      resourceType = "raw";
    }

    return {
      folder: "products",
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname}`
    };
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // ✅ 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      // images
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",

      // files
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image, pdf, doc, docx, txt files allowed"),
        false
      );
    }
  }
});
