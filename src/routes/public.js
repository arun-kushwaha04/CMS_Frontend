//imports
import Login from '../components/pages/login/Login'
import ResetPassword from '../components/pages/reset-password/ResetPassword'


const publicRoutes = [
    {
        component: Login,
        path: '/',
    },
    {
        component: ResetPassword,
        path: '/reset/:accessToken',
    },
]
export default publicRoutes
