import { trpc } from '../../../lib/trpc'

export const getAllPostsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  const total = await ctx.prisma.post.count();
  return { posts, total }
})
