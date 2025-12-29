// // import express from 'express'
// // import cors from 'cors'
// // import 'dotenv/config'
// // import connectedDB from './config/mongodb'
// // import connectedCloudinary from './config/cloudinary'
// // import authRouter from './routes/auth'

// // const app = express()
// // const port = process.env.PORT || 5000
// // connectedDB()
// // connectedCloudinary()

// // app.use(express.json())
// // app.use(cors())

// // app.use("/api/v1/auth", authRouter)
// // // app.use("/api/v1/post", postRouter)


// // app.listen(port , () => console.log("Started server" , port))
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb'
// import connectCloudinary from './config/cloudinary'
// import addminRouter from './routes/addminRoute'
// import doctorRouter from './routes/doctorRoute'
// import userRouter from './routes/userRoute'

// // app config
// const app = express()
// const port = process.env.PORT || 5000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use('/api/v1/admin', addminRouter)  // localhost:5000/api/v1/addmin/add-doctor
// app.use('/api/v1/doctor' , doctorRouter)
// app.use('/api/v1/user', userRouter)

// app.listen(port , () => console.log("Server started" , port))

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectedDB from './config/mongodb'
import connectedCloudinary from './config/cloudinary'
// import authRouter from './app'
import categoryRouter from './routes/category.routes'; 
import authRouter from './routes/auth.routes';// ඔබගේ route file path එක

import userRouter from './routes/user.routes';

import projectRouter from './routes/project.routes';

const app = express()
const port = process.env.PORT || 5000
connectedDB()
connectedCloudinary()

app.use(express.json())
app.use(cors())


app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter)
app.use('/api/user', userRouter);

app.use('/api/project', projectRouter);

app.listen(port , () => console.log("Started server" , port))

// import app from "./app";
// import dotenv from "dotenv";
// import DBConnection from "./db/DBConnection";

// dotenv.config();

// const port = process.env.PORT || 5000;

// DBConnection().then(result => console.log(result))

// app.listen(port, () =>{
//     console.log(`Server is running at http://localhost:${port}`)
// });
