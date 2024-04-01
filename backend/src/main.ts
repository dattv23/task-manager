import express, { NextFunction, Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { createServer } from 'http'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rootRouter from './routes'
import { env } from './config/env.config'
import { databaseService } from './services/database.services'
import { errorHandler } from './middlewares/error.middlewares'
import exitHook from 'async-exit-hook'
import { DATABASE_MESSAGE } from './constants/messages'
import 'express-async-errors'
import session from 'express-session'
import { Client, generators, Issuer } from 'openid-client'

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
    cookie: { secure: false, sameSite: 'strict' } // for HTTP; set true for HTTPS
  })
)

app.use('/api', rootRouter)

// let client: Client

// Initialize OpenID client
// async function initOpenIDClient() {
//   const googleIssuer = await Issuer.discover('https://accounts.google.com')
//   client = new googleIssuer.Client({
//     client_id: env.auth.client_id!,
//     client_secret: env.auth.client_secret,
//     redirect_uris: ['http://localhost:8080/callback'],
//     response_types: ['code']
//   })
// }

// Authentication URL
// app.get('/auth', (req, res) => {
//   const code_verifier = generators.codeVerifier()
//   const code_challenge = generators.codeChallenge(code_verifier)
//   req.session.code_verifier = code_verifier // Store in session

//   const authUrl = client.authorizationUrl({
//     scope: 'openid email profile',
//     code_challenge,
//     code_challenge_method: 'S256'
//   })
//   res.redirect(authUrl)
// })

// Callback URL
// app.get('/callback', async (req, res) => {
//   const params = client.callbackParams(req)
//   const tokenSet = await client.callback('http://localhost:8080/callback', params, { code_verifier: req.session.code_verifier })
//   const userinfo = await client.userinfo(tokenSet)

//   res.json({ userinfo })
// })

app.get('/', (req: Request, res: Response) => {
  sendResponse.success(res, [], 'Hello world')
})

// Connect database task manager
databaseService.connect()

// Error handling
app.use(errorHandler)

httpServer.listen({ port: env.server.port, hostname: env.server.host }, async () => {
  // await initOpenIDClient()
  console.log(`🚀 Server Is Running At http://${env.server.host}:${env.server.port}`)
})

exitHook(() => {
  databaseService.disConnect()
  console.log(DATABASE_MESSAGE.DISCONNECT)
})
