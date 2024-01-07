import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'
import { rateLimit } from 'express-rate-limit'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '5mb' }))
app.use(fileUpload())
app.use(
  rateLimit({
    windowMs: 1000 * 60,
    limit: 500,
  })
)

export default app
