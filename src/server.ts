import app from './app'
import Moralis from 'moralis'
import mongoose from 'mongoose'
mongoose.pluralize(null)

import config from './config'
import logger from './logger'

import v1Router from './routes/v1'

app.use('/api/v1', v1Router)

async function main() {
  try {
    await mongoose.connect(config.MONGO_URI, { dbName: config.MONGO_DB_NAME })
    logger.info('Connected to Database...')

    await Moralis.start({ apiKey: config.MORALIS_KEY })
    logger.info('Connected to Moralis...')

    app.listen(config.PORT)
    logger.info(`Server is running on PORT ${config.PORT}...`)
  } catch (e) {
    const err = e as Error
    logger.error('Failed to start server')
    logger.error(err.message)
    throw e
  }
}

main()
