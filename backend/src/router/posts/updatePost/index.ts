import { trpc } from '../../../lib/trpc'
import { zUpdatePostTrpcInput } from './input'

export const updatePostTrpcRoute = trpc.procedure.input(zUpdatePostTrpcInput).mutation(async ({ input, ctx }) => {
  const postById = await ctx.prisma.post.findFirst({
    where: {
      id: input.id,
    },
  })
  if (!postById) {
    throw Error('Post with this id not found')
  }
  if (postById.slug !== input.slug) {
    const postBySlug = await ctx.prisma.post.findFirst({
      where: {
        slug: input.slug,
      },
    })
    if (postBySlug) {
      throw Error('Post with this slug already exists')
    }
  }
  await ctx.prisma.post.update({
    where: {
      id: postById.id
    },
    data: { ...input, author: undefined }, //TODO: add author and checks
  })
  // here
  return true
})
