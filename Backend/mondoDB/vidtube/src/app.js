import express from "express"
import cors from 'cors'
const app=express()
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    })
)
//common middleware
app.use(express.json({limit:'16k'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
//import routes
import healthCheckRouter from './routes/heathCheck.routes.js'
import userRouter from './routes/user.routes.js'
import { errorHandler } from "./middlewares/error.middlewares.js"
app.use('/api/v1/healthcheck',healthCheckRouter)
app.use('api/v1/users',userRouter)

app.use(errorHandler)
export {app}