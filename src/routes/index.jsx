import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Gallery from '../pages/Gallery'
import Request from '../pages/Request'
import Profile from '../pages/Profile'
import Admin from '../pages/Admin'
import Layout from '../components/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'gallery', element: <Gallery /> },
            { path: 'request', element: <Request /> },
            { path: 'profile', element: <Profile /> },
            { path: 'admin', element: <Admin /> },
        ]
    }
])

export default function AppRoutes() {
    return <RouterProvider router={router} />
}