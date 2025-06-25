import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { NavMenu } from './NavMenu'
import { NavigationSheet } from './NavigationSheet'
//import { authClient } from "@/lib/auth-client";
import { Link } from 'react-router-dom'
import { AvatarDropdown } from './AvatarDropdown'
import { Logo } from './Logo'
import { useMe } from '@/lib/ctx'

const Navbar = () => {
  const me = useMe()
  return (
    <div className="bg-muted">
      <nav className="bg-background h-16 border-b">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>
          <div className="flex items-center gap-3">
            {!me && (
              <>
                <Button variant="outline" className="hidden sm:inline-flex">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
            <AvatarDropdown />
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
