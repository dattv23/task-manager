/* eslint-disable no-console */
import mongoose from 'mongoose'

// Connect to the database
const dbConnect = () => {
  mongoose.connect(`${process.env.MONGO_URL}`, {
    connectTimeoutMS: 3000
  })

  mongoose.connection.on('connected', () => {
    console.log('Connect to database successfully')
  })

  mongoose.connection.on('error', err => {
    console.log('Error while connecting to database: ', err)
  })
}

export default dbConnect
