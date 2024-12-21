import { Router } from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduduct } from "../controller/productController.js";
import { upload } from "../middleeware/uploadPic.js";
import { verifyToken } from "../middleeware/verifficationToken.js";
import { checkRole } from "../middleeware/checkRole.js";

const productRouter = Router()

productRouter.get('/', getAllProducts)
             .post('/', verifyToken, checkRole('admin'), upload.single('image'), createProduct);
productRouter.get('/:id', getProduct)
             .put('/:id', verifyToken, checkRole('admin'), upload.single('image'), updateProduct)
             .delete('/:id', verifyToken, checkRole('admin'), deleteProduduct)

export default productRouter;