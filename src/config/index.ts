import z from 'zod'

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('5000'),
  MONGO_URI: z.string().trim().min(1),
  MONGO_DB_NAME: z.string().trim().min(1),
  JWT_SECRET_KEY: z.string().trim().min(1),
  MORALIS_KEY: z.string().trim().min(1),
})

const config = configSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  MORALIS_KEY: process.env.MORALIS_KEY,
})

if (!config.success) {
  throw new Error('Missing environment variable')
}

export type ConfigSchemaType = z.infer<typeof configSchema>

export default config.data
