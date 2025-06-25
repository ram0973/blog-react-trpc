import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin, openAPI } from 'better-auth/plugins'
import { prisma } from './ctx'
import { env } from './env'

export const auth = betterAuth({
  plugins: [openAPI(), admin()],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    disableSessionRefresh: false,
    cookieCache: {
      enabled: false,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    requireEmailVerification: false,
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 1,
    maxPasswordLength: 128,
  },
  trustedOrigins: [`${env.WEBAPP_URL}`],
})
