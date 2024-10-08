import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './router/userRoute'
import productRoute from './router/productRoute'

const app: Application = express()
const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
// Middleware
app.use(helmet())
app.use(cookieParser())

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes
app.use('/api/v1/user', userRoute)
app.use('/api/v1/products', productRoute)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandler)

export default app
