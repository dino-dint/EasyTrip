import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ComingSoon from '../pages/ComingSoon/ComingSoon'
import Home from '../pages/Home/Home'
import Hotels from '../pages/Hotels/Hotels'
import HotelDetails from '../pages/Hotels/HotelDetails'
import Flights from '../pages/Flights/Flight'
import FlightDetails from '../pages/Flights/FlightDetails'


function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/destination' element={<ComingSoon title="Destination"/>}/>
        <Route path='/accommodation' element={<Hotels/>}/>
        <Route path='/accommodation/:id' element={<HotelDetails/>}/>
        <Route path='/flight' element={<Flights/>}/>
        <Route path='/flight/:id' element={<FlightDetails/>}/>
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


