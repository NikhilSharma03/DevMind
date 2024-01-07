import type { ConfigSchemaType } from './../config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConfigSchemaType {}
  }
}
