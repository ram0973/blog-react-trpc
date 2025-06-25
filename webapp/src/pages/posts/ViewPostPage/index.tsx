import { useParams } from 'react-router-dom'
import { ViewPostRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { PageLoader } from '@/components/PageLoader'

export const ViewPostPage = () => {
  const { slug } = useParams() as ViewPostRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getPostBySlug.useQuery({
    slug,
  })

  if (isLoading || isFetching) {
    return <PageLoader type="page" />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.post) {
    return <span>Post not found</span>
  }

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: data.post.content ?? ''}} />
    </div>
  )
}
