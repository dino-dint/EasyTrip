import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import Home from "../pages/Home/Home";
import DestinationPage from "../pages/Destination/DestinationPage";
import SearchResults from "../pages/Find/SearchResults";
import Contact from "../pages/Contact/Contact";
import Wishlist from "../pages/Wishlist/Wishlist";
import MyTrip from "../pages/MyTrips/MyTrips";
import Profile from "../pages/Profile/Profile";import Hotels from '../pages/Hotels/Hotels'
import HotelDetails from '../pages/Hotels/HotelDetails'
import Flights from '../pages/Flights/Flight'
import FlightDetails from '../pages/Flights/FlightDetails'


function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:country" element={<DestinationPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/accommodation"
          element={<Hotels/>}/>
        <Route path='/accommodation/:id' element={<HotelDetails />}
        />
        <Route path="/flight" element={<Flights/>}/>
        <Route path='/flight/:id' element={<FlightDetails />} />
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/my-trip" element={<MyTrip/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* Optional fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default AppRoutes;
