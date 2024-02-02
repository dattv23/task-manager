import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { sendResponse } from '~/config/response.config'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  sendResponse.success(res, [], 'Hello world')
})

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`)
})
