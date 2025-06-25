import { trpc } from '../../../lib/trpc'

export const getPostsForHomeTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const POSTS_ON_HOME = 10
  const posts = await ctx.prisma.post.findMany({
    select: {
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: POSTS_ON_HOME,
  })

  return { posts }
})
