import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ComingSoon from '../pages/ComingSoon/ComingSoon'
import Home from '../pages/Home/Home'
import DestinationPage from '../pages/Destination/DestinationPage'
import SearchResults from '../pages/Find/SearchResults'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/destination/:country' element={<DestinationPage/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/accommodation' element={<ComingSoon title="Hotels & Resorts"/>}/>
        <Route path='/flight' element={<ComingSoon title="Flights"/>}/>
        <Route path='/contact' element={<ComingSoon title="Contact"/>}/>
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


