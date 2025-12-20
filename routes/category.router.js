import express from 'express';
import {upload} from '../multer/multer.js'

//to link controller
import * as CategoryController from '../controller/category.controller.js';

const router = express.Router();
console.log("category routers");
router.post("/save",CategoryController.save);

router.get("/fetch",CategoryController.fetch);

router.delete("/delete",CategoryController.deleteCategory);

router.patch("/update",CategoryController.update);

export default router;


