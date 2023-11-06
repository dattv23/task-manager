import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan'; // record log request, error in console
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose'

dotenv.config();

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: true }));
/** Takes care of JSON data */
router.use(express.json());
// Allow requests from the specified origin
router.use(cors())

// Connect to the database
mongoose.connect(`${process.env.MONGO_URL}`, {
      connectTimeoutMS: 10000
})
      .then(() => console.log("Connected to mongoDB."))
      .catch((err) => console.log("Unable to connect."))

/** RULES OF OUR API */
router.use((req, res, next) => {
      // set the CORS policy
      res.header('Access-Control-Allow-Origin', '*');
      // set the CORS headers
      res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
      // set the CORS method headers
      if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST');
            return res.status(200).json({});
      }
      next();
});

/** Routes */
router.use('/', (req, res, next) => {
      return res.status(200).json({
            message: "Hello World!!!"
      });
});


/** Error handling */
router.use((req, res, next) => {
      const error = new Error('not found');
      return res.status(404).json({
            message: error.message
      });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 8080;

httpServer.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
});

// Add an event handler for server errors
httpServer.on('error', (error: Error) => {
      console.error('Server error:', error);
});