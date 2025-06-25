import type { TrpcRouter } from '@blog/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import { env } from './env'

export const trpc = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // не возвращает Error, а стоит на Loading, если true
      refetchOnWindowFocus: false,
    },
  },
})

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      transformer: superjson,
      url: env.VITE_BACKEND_TRPC_URL,
      // fetch(url, defaultOptions) {
      //   return fetch(url, {
      //     ...defaultOptions,
      //     credentials: 'include',
      //   });
      // },
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
)
