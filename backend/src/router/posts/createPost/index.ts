import { trpc } from '../../../lib/trpc'
import { zCreatePostTrpcInput } from './input'

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(async ({ input, ctx }) => {
  const existedPost = await ctx.prisma.post.findFirst({
    where: {
      slug: input.slug,
    },
  })
  if (existedPost) {
    throw Error('Post with this slug already exists')
  }
  await ctx.prisma.post.create({
    data: { ...input, author: undefined },
  })
  return true
})
