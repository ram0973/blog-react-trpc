import z from 'zod'
import { trpc } from '../../../lib/trpc'

export const getPostByIdTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findFirst({
      where: {
        id: input.id
      }
    })
    return { post }
  })
