import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { sendResponse } from '~/config/response.config'
import { createServer } from 'http'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rootRouter from './routes'
import { env } from './config/env.config'
import { databaseService } from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

dotenv.config()

const app: Express = express()
const httpServer = createServer(app)

// enable all CORS requests
app.use(cors())

// logs HTTP requests
app.use(morgan('dev'))

// disable the 'x-powered-by' header to hide technical
app.disable('x-powered-by')

// handle requests with a JSON payload
app.use(express.json())

// parse incoming URL-encoded data in request body
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// parser and handle HTTP cookies
app.use(cookieParser())

// compress all responses
app.use(compression())

app.get('/', (req: Request, res: Response) => {
  sendResponse.success(res, [], 'Hello world')
})

app.use('/api', rootRouter)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Connect database task manager
databaseService.connect()

// Error handling
app.use(defaultErrorHandler)

httpServer.listen(env.server.port, () => {
  console.log(`[Server]: Server is running at http://localhost:${env.server.port}`)
})
