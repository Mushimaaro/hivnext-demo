import express from 'express';
import { getUser, getAllUsers, updateUser, deleteUser, createUser } from '../controllers/userController.js';
import userAuth from "../middlewares/userAuth.js"

const userRouter = express.Router();

userRouter.post('/get', userAuth, getUser);
userRouter.get('/get-all', userAuth, getAllUsers);
userRouter.put('/update', userAuth, updateUser);
userRouter.delete('/delete', userAuth, deleteUser);
userRouter.post('/create', userAuth, createUser);

export default userRouter;