import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import { zCreatePostTrpcInput } from '@blog/backend/src/router/posts/createPost/input'
import { useNavigate } from 'react-router-dom'

export const CreatePostPage = () => {

  const form = useForm<z.infer<typeof zCreatePostTrpcInput>>({
    resolver: zodResolver(zCreatePostTrpcInput),
    defaultValues: {
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      createdAt: new Date(),
    },
  })

  const createPost = trpc.createPost.useMutation()
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof zCreatePostTrpcInput>) {
    try {
      await createPost.mutateAsync(values)
      form.reset()
      toast('Post has been created.')
      navigate("/dashboard/posts")
    } catch (error: unknown) {
      toast('Error while creating post: ' + error, {
        style: {
          color: 'red'
        },
        icon: <CircleAlert />
      })
    }
  }

  return (
    <>
      <title>Posts | Create post</title>
      <h1 className="mt-5 mb-5 text-3xl">Create post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post slug" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter post content" {...field} rows={12}/>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}</Button>
        </form>
      </Form>
    </>
  )
}
