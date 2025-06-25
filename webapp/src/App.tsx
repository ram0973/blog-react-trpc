import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { DashboardLayout } from './components/DashboardLayout'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { CreatePostPage } from './pages/posts/CreatePostPage'
import { HomePage } from './pages/others/HomePage'
import { PostsPage } from './pages/posts/PostsPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { UpdatePostPage } from './pages/posts/UpdatePostPage'
import { ViewPostPage } from './pages/posts/ViewPostPage'
import { NotFound } from './components/NotFound'

export const App = () => (
  <TrpcProvider>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route path={routes.getHomeRoute()} element={<HomePage />} />
            <Route path={routes.getViewPostRoute(routes.viewPostRouteParams)} element={<ViewPostPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<DashboardLayout />}>
            {/* <Route path={routes.getUsersRoute()} element={<UsersPage />} /> */}
            <Route path={routes.getPostsRoute()} element={<PostsPage />} />
            <Route path={routes.getNewPostRoute()} element={<CreatePostPage />} />
            <Route path={routes.getUpdatePostRoute(routes.updatePostRouteParams)} element={<UpdatePostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </TrpcProvider>
)
