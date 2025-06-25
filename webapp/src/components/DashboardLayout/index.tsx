import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from '../AppSidebar'
import { AvatarDropdown } from '../Navbar/AvatarDropdown'
import ThemeToggle from '../ThemeToggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'

export const DashboardLayout = () => {
  const location = useLocation()
  const breadcrumbs = location.pathname
    .substring(1)
    .split('/')
    .map((item) => item.toUpperCase())
  return (
    <div>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-svh flex-1 p-4">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>TODO</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex">
              <div className="mr-2">
                <ThemeToggle />
              </div>
              <AvatarDropdown />
            </div>
          </header>
          {/* <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 px-6 py-10 lg:flex-row lg:py-16 xl:px-0"> */}
          <Outlet />
        </main>
      </SidebarProvider>
      {/* </div> */}
    </div>
  )
}
