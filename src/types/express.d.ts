import type { ParsedAuthTokenData } from './../types/jwt.type'

declare global {
  namespace Express {
    interface Request {
      userInfo?: ParsedAuthTokenData
    }
  }
}
