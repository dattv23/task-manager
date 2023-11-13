/* eslint-disable no-console */
import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan' // record log request, error in console
import cors from 'cors'
import AsyncExitHook from 'async-exit-hook'

import userRouter from './routes/user.routes'
import { closeDB, connectDB } from './config/mongodb'
import { env } from './config/environment'

const startServer = () => {
  const router: Express = express()

  /** Logging */
  router.use(morgan('dev'))
  /** Parse the request */
  router.use(express.urlencoded({ extended: true }))
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

  router.use('/api', userRouter)

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
  closeDB()
})

connectDB()
  .then(() => console.log('Connected to database!'))
  .then(() => startServer())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })