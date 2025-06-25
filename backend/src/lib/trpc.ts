import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import superjson from 'superjson'
import { AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson
})

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}

import { getHomeRoute } from '@blog/webapp/src/lib/routes'
console.log(getHomeRoute)
