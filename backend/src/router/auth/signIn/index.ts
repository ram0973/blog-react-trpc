import { auth } from '../../../lib/auth'
import { trpc } from '../../../lib/trpc'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ input, ctx }) => {
  const existedUser = await ctx.prisma.user.findFirst({
    where: {
      email: input.email,
    },
  })
  if (!existedUser) {
    throw Error('Wrong email or password')
  }
  const response = await auth.api.signInEmail({
    body: {
      email: input.email,
      password: input.password,
    },
    asResponse: true,
  })
  console.info(response)
  return response
})
