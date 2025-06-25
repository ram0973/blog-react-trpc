//import type { Post } from "@prisma/client";
//import type { Post } from "@blog/backend"
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DeletePostDialog } from './DeletePostDialog'

export const columns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    meta: 'Id',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="">
          <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
            Id
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === 'asc' && <ArrowUp className="h-4 w-4" />}
            {isSorted === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'slug',
    meta: 'Slug',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="">
          <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
            Slug
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === 'asc' && <ArrowUp className="h-4 w-4" />}
            {isSorted === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('slug')}</div>
    },
  },
  {
    accessorKey: 'title',
    meta: 'Title',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Title
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === 'asc' && <ArrowUp className="h-4 w-4" />}
            {isSorted === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('title')}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    meta: 'Created',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Created
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === 'asc' && <ArrowUp className="h-4 w-4" />}
            {isSorted === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const createdAt = format(Date.parse(row.getValue('createdAt')), 'dd.MM.yyyy')
      return <div className="font-medium">{createdAt}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id: string = row.original.id
      const slug: string = row.original.slug
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to={`/dashboard/edit-post/${id}`}>Edit post</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/posts/${slug}`}>View post</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger className="w-full">
                <DropdownMenuItem variant="destructive">Delete Post</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeletePostDialog id={id} />
          {/* <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure to delete post?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deletePost({id})}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent> */}
        </AlertDialog>
      )
    },
  },
]
