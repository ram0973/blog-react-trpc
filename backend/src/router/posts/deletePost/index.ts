import z from 'zod'
import { trpc } from '../../../lib/trpc'

export const deletePostTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findFirst({
      where: {
        id: input.id
      }
    })
    if (!post) {
      throw new Error('Post with this id not found')
    }
    await ctx.prisma.post.delete({
      where: {
        id: input.id
      }
    })
    return true
  })
