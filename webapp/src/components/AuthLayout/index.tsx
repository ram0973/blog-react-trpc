import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/sonner'

export const AuthLayout = () => {
  return (
    <>
      <Toaster />
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </>
  )
}
