import z from 'zod'
import { trpc } from '../../../lib/trpc'

export const getPostBySlugTrpcRoute = trpc.procedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findFirst({
      where: {
        slug: input.slug
      }
    })
    return { post }
  })
