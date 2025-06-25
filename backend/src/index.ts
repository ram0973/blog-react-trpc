import cors from 'cors'
import express from 'express'
import { toNodeHandler } from "better-auth/node"

import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { AppContext, createAppContext } from './lib/ctx'
import { auth } from './lib/auth'
import { env } from './lib/env'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors({
      credentials: true,
      origin: env.WEBAPP_URL,
    }))
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    expressApp.all('/api/auth/{*any}', toNodeHandler(auth));
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(env.PORT, () => {
      console.info('Listening at http://localhost:' + env.PORT)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
