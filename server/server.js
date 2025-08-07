import "dotenv/config";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import roleRouter from "./routers/roleRouter.js";
import clientRouter from "./routers/clientRouter.js";

const app = express();
const PORT = 5000 || process.env.PORT;


// Cors
const corsOptions = {
   origin: ['http://localhost:5173/', 'http://localhost:5173', 'http://127.0.0.1:5173/', 'http://127.0.0.1:5173'],
   credentials: true,
   optionsSuccessStatus: 200,
   allowedHeaders:  ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
//app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI).then(() => {
   console.log('Database connected.')
}).catch((err) => {
   console.log(err);
}) 

//create admin user
import createAdmin from "./utils/defineAdmin.js";
import User from "./models/usersModel.js";

User.findOne({}).then((user, err) =>{
   if(err){throw err}
   if(!user){
      createAdmin();
   }
}).catch((err) => {
   console.error("Error creating owner:", err)
})

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/client', clientRouter);

app.listen(PORT, () => {
   console.log(`App running on ${process.env.NODE_ENV}`);
   console.log(`App listening on port ${PORT}`);
})