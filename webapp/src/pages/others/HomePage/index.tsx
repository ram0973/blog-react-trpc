import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, ClockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getViewPostRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { categories } from './categories'

export const HomePage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getPostsForHome.useQuery()

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  return (
    <>
        <div>
          <div className="mt-4 space-y-12">
            <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
            {data?.posts.map((post) => (
              <Card
                key={post.slug}
                className="flex flex-col gap-4 overflow-hidden border-none shadow-none sm:flex-row sm:gap-6"
              >
                <div className="flex-shrink-0 sm:w-56">
                  <div className="bg-muted aspect-video rounded-lg sm:aspect-square" />
                </div>
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center gap-6">
                    <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                      Technology
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    <Link to={getViewPostRoute({ slug: post.slug })}>{post.title}</Link>
                  </h3>
                  {post.excerpt?.substring(0, 150)} ...
                  <div className="text-muted-foreground mt-4 flex items-center gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" /> 5 min read
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {(post.createdAt.toLocaleString())}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <aside className="sticky top-8 w-full shrink-0 lg:max-w-sm">
          <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className={cn(
                  'bg-muted flex items-center justify-between gap-2 rounded-md bg-opacity-15 p-3 dark:bg-opacity-25',
                  category.background,
                )}
              >
                <div className="flex items-center gap-3">
                  <category.icon className={cn('h-5 w-5', category.color)} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge className="rounded-full px-1.5">{category.totalPosts}</Badge>
              </div>
            ))}
          </div>
        </aside>

    </>
  )
}
