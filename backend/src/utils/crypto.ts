import { createHash } from 'crypto'
import { env } from '~/config/env.config'

export const sha256 = (content: string) => createHash('sha256').update(content).digest('hex')

export const hashText = (text: string) => sha256(text + env.server.secret)
