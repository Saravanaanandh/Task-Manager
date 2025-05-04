import express from 'express'
import { connectDB } from './config/dbConn.js'
import db from './config/dbConn.js'
import createTables from './model/createTables.js'
import cors from 'cors'
import userRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import dotenv from 'dotenv'
import verifyJWT from './middleware/auth.middleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB();
createTables(); 

app.use(cors({
    origin:["http://localhost:5173","http://localhost:5173/"] ,
    methods: "GET,POST,PATCH,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/tasks',verifyJWT,taskRoutes)
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})