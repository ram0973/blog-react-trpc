import { auth } from '../../../lib/auth'
import { trpc } from '../../../lib/trpc'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ input, ctx }) => {
  const existedUser = await ctx.prisma.user.findFirst({
    where: {
      email: input.email,
    },
  })
  if (existedUser) {
    throw Error('User with this email is already exists')
  }
  const response = await auth.api.signUpEmail({
    body: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
    asResponse: true,
  })

  return response
})
