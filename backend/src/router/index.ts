// VS Code extension used: Generate Index, for auto generation index file with routes. Ctrl + K I
import { trpc } from "../lib/trpc"
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { createPostTrpcRoute } from './posts/createPost'
import { deletePostTrpcRoute } from './posts/deletePost'
import { getAllPostsTrpcRoute } from './posts/getAllPosts'
import { getPostByIdTrpcRoute } from './posts/getPostById'
import { getPostBySlugTrpcRoute } from './posts/getPostBySlug'
import { getPostsForHomeTrpcRoute } from './posts/getPostsForHome'
import { updatePostTrpcRoute } from './posts/updatePost'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  createPost: createPostTrpcRoute,
  deletePost: deletePostTrpcRoute,
  getAllPosts: getAllPostsTrpcRoute,
  getPostById: getPostByIdTrpcRoute,
  getPostBySlug: getPostBySlugTrpcRoute,
  getPostsForHome: getPostsForHomeTrpcRoute,
  updatePost: updatePostTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
