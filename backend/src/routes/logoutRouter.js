import { Router } from "express";
import { logout } from "../controller/logoutController.js";

const logoutRouter = Router();

logoutRouter.post('/', logout);

export default logoutRouter;
