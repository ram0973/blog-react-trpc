import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UpdatePostRouteParams } from '@/lib/routes'
import { trpc } from '@/lib/trpc'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { FormInput } from '@/components/FormInput'
import { FormTextArea } from '@/components/FormTextArea'
import { zUpdatePostTrpcInput } from '@blog/backend/src/router/posts/updatePost/input'
import { PageLoader } from '@/components/PageLoader'

export const UpdatePostPage = () => {
  const { id } = useParams() as UpdatePostRouteParams
  const { data, error, isLoading, isFetching, isError } = trpc.getPostById.useQuery({
    id,
  })

  if (isLoading || isFetching) {
    return <PageLoader type='page' />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.post) {
    return <span>Post not found</span>
  }

  return <UpdatePostComponent post={data.post} />
}

const UpdatePostComponent = ({ post }: {post: z.infer<typeof zUpdatePostTrpcInput>}) => {
  const form = useForm<z.infer<typeof zUpdatePostTrpcInput>>({
    resolver: zodResolver(zUpdatePostTrpcInput),
    defaultValues: {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      createdAt: post.createdAt,
    },
  })

  const editPost = trpc.updatePost.useMutation()
  const navigate = useNavigate()
  async function onSubmit(values: z.infer<typeof zUpdatePostTrpcInput>) {
    try {
      await editPost.mutateAsync(values)
      toast('Post has been updated')
      navigate('/dashboard/posts')
    } catch (error: unknown) {
      toast('Error while editing post: ' + error, {
        style: {
          color: 'red',
        },
        icon: <CircleAlert />,
      })
    }
  }

  return (
    <div>
      <h1 className="mb-5 text-3xl">Update Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormInput form={form} name="slug" label="Slug" placeholder="Enter post slug"/>
          {/* <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post excerpt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter post content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormTextArea form={form} name="content" label="Content" placeholder="Enter post content"/>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
