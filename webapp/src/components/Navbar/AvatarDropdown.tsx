//import { authClient } from "@/lib/auth-client";
import { authClient } from '@/lib/auth-client'
import { useMe } from '@/lib/ctx'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const AvatarDropdown = () => {
  const me = useMe()
  const navigate = useNavigate()

  return (
    me && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={me.image ?? '/avatar.jpg'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{me.name}</DropdownMenuLabel>
          <DropdownMenuLabel>{me.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/dashboard/posts">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate('/')
                  },
                },
              })
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}
