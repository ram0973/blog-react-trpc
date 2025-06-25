import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { trpc } from '@/lib/trpc'
import { CircleAlert } from 'lucide-react'
import { toast } from 'sonner'

export const DeletePostDialog = ({ id }: { id: string }) => {
  const utils = trpc.useUtils()
  const deletePost = trpc.deletePost.useMutation()

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync({ id })
      toast.success('Post deleted successfully')
      utils.getAllPosts.invalidate() // Инвалидируем кэш
    } catch (error) {
      toast('Error while deleting post', {
        description: error instanceof Error ? error.message : 'Unknown error',
        style: { color: 'red' },
        icon: <CircleAlert />,
      })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure to delete post?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
