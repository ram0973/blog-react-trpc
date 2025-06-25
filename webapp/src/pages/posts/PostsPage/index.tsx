import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { columns } from './columns'
import { PageLoader } from '@/components/PageLoader'

export const PostsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getAllPosts.useQuery()

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isLoading || isFetching) {
    return <PageLoader type="page" />
  }

  return (
    <>
      <div className="flex justify-end mt-5">
        <Button>
          <Link to="/dashboard/create-post">Create post</Link>
        </Button>
      </div>
      <DataTable data={data?.posts ?? []} columns={columns} findByField="title" />
    </>
  )
}
