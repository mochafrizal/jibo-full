import { Router } from "express";
import { createUser,
         deleteUser,
         getUser,
         getUsers,
         updateUser 
        } from "../controller/userController.js";
import { createUserValidation,
         updateUserValidation,
         result      
       } from "../middleeware/userValidation.js";

const userRouter = Router()

userRouter.get('/', getUsers)
          .post('/', createUserValidation, result, createUser)
userRouter.get('/:id', getUser)
          .put('/:id', updateUserValidation, result, updateUser)
          .delete('/:id', deleteUser)

export default userRouter;