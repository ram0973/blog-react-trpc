
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Toaster } from '../ui/sonner'

export const Layout = () => {
  return (
    <>
      <div>
        <Toaster />
        <Navbar />
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 px-6 py-10 lg:flex-row lg:py-16 xl:px-0">
          <Outlet />
        </div>
      </div>
    </>
  )
}
