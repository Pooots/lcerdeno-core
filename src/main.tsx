import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import './styles.css'
import { AppProviders } from './AppProviders'
import StatusPage from '@/routes/StatusPage'
import ChristeningPage from '@/routes/ChristeningPage'
import ShareCardPage from '@/routes/ShareCardPage'
import reportWebVitals from './reportWebVitals'

document.title =
  import.meta.env.VITE_APP_TITLE || 'The Christening of L C. Cerdeno'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ChristeningPage,
})

const statusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/status',
  component: StatusPage,
})

const shareCardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/share-card',
  component: ShareCardPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  statusRoute,
  shareCardRoute,
])

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  )
}

reportWebVitals()
