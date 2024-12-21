import { Router } from "express"
import { login } from "../controller/loginController.js"

const loginRouter = Router();

loginRouter.post('/', login)

export default loginRouter;
