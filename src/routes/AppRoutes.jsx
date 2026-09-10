import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ComingSoon from '../pages/ComingSoon/ComingSoon'
import Home from '../pages/Home/Home'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/home' element={<Home/>} />
      </Route>


      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot' element={<ForgotPassword/>}/>

       {/* Optional fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default AppRoutes
