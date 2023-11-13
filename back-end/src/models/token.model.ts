import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400 // 30 days
  }
})

const Token = model('Token', tokenSchema)
export default Token
