/* eslint-disable no-console */
import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan' // record log request, error in console
import cors from 'cors'
import AsyncExitHook from 'async-exit-hook'
import cookieParser from 'cookie-parser'

import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import databaseServices from './services/database.service'

const startServer = () => {
  const router: Express = express()

  /** Logging */
  router.use(morgan('dev'))
  /** Parse the request */
  router.use(express.urlencoded({ extended: true }))
  /** Parse the cookie */
  router.use(cookieParser())
  /** Takes care of JSON data */
  router.use(express.json())
  /**  Allow requests from the specified origin */
  router.use(cors())

  /** RULES OF OUR API */
  router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*')
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization')
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST')
      return res.status(200).json({})
    }
    next()
  })

  /** Routes */
  router.use('/test', async (req, res) => {
    return res.status(200).json({
      message: 'Hello World!!!'
    })
  })


  router.use('/v1', APIs_V1)

  /** Error handling */
  router.use((req, res) => {
    const error = new Error('not found')
    return res.status(404).json({
      message: error.message
    })
  })

  /** Server */
  const httpServer = http.createServer(router)

  httpServer.listen(env.PORT, async () => {
    console.log(`Server is running on port ${env.PORT}`)
  })

  // Add an event handler for server errors
  httpServer.on('error', (error: Error) => {
    console.error('Server error:', error)
  })
}

// cleanup before stop server
AsyncExitHook(() => {
  databaseServices.closeDB()
  console.log('Closed database')
})

console.log('Connecting to database...')
databaseServices.connectDB()
  .then(() => console.log('Connected to database!'))
  .then(() => startServer())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })