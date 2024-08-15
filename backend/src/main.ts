import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'
import { createServer } from 'http'
import session from 'express-session'
import compression from 'compression'
import exitHook from 'async-exit-hook'
import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'

import rootRouter from './routes'
import { env } from './config/env.config'
import { sendResponse } from './config/response.config'
import { DATABASE_MESSAGE } from './constants/messages'
import { databaseService } from './services/database.services'
import { errorHandler } from './middlewares/error.middlewares'

const app = express()
const httpServer = createServer(app)

// set up middleware
app.use(express.json())

// CORS configuration
const corsOptions = {
  credentials: true
}

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
app.use(cookieParser(env.server.secret!))

// compress all responses
app.use(compression())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(
  session({
    secret: env.server.secret!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'lax' } // for HTTP; set true for HTTPS
  })
)

app.use('/api', rootRouter)

app.get('/', (req: Request, res: Response) => {
  sendResponse.success(res, [], 'Hello world')
})

// Connect database task manager
databaseService.connect()

// Error handling
app.use(errorHandler)

httpServer.listen({ port: env.server.port, hostname: env.server.host }, async () => {
  console.log(`🚀 Server Is Running At http://${env.server.host}:${env.server.port}`)
})

exitHook(() => {
  databaseService.disConnect()
  console.log(DATABASE_MESSAGE.DISCONNECT)
})
