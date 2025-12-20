import express from 'express';
import {upload} from '../multer/multer.js'


//to link controller
import * as SubCategoryController from '../controller/subcategory.controller.js';

const router = express.Router();

router.post("/save",upload.single("caticon"),SubCategoryController.save);

router.get("/fetch",SubCategoryController.fetch);

//router.delete("/delete",CategoryController.deleteCategory);

//router.patch("/update",CategoryController.update);

export default router;


