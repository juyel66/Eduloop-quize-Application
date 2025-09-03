import MainPageLayout from '@/layouts/MainPageLayout'
import ArithmeticPage from '@/pages/Arithmetic/ArithmeticPage'
import {createBrowserRouter} from 'react-router'

export const router = createBrowserRouter([
    {
        path:"/",
        Component: MainPageLayout,
        children: [
            {
                path: "/",
                Component: ArithmeticPage
            }
        ]
    }
])

