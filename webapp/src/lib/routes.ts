const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getHomeRoute = () => '/'

export const viewPostRouteParams = getRouteParams({ slug: true })
export type ViewPostRouteParams = typeof viewPostRouteParams
export const getViewPostRoute = ({ slug }: ViewPostRouteParams) => `/posts/${slug}`

export const updatePostRouteParams = getRouteParams({ id: true })
export type UpdatePostRouteParams = typeof updatePostRouteParams
export const getUpdatePostRoute = ({ id }: UpdatePostRouteParams) => `/dashboard/edit-post/${id}`

export const getNewPostRoute = () => '/dashboard/create-post'
export const getPostsRoute = () => '/dashboard/posts'
export const getSignUpRoute = () => '/signup'
export const getSignInRoute = () => '/signin'
