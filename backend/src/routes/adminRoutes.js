import { Router } from "express";
import {
    createUserValidation,
    updateUserValidation,
    result
} from "../middleeware/userValidation.js";
import {
    createAdmin,
    deleteAdmin,
    getAdmin,
    getAdmins,
    updateAdmin
} from "../controller/adminController.js";

const adminRouter = Router();

adminRouter.get('/', getAdmins)
    .post('/', createUserValidation, result, createAdmin)
adminRouter.get('/:id', getAdmin)
    .put('/:id', updateUserValidation, result, updateAdmin)
    .delete('/:id', deleteAdmin)

export default adminRouter;
