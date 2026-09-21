import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Home from "../pages/Home/Home";
import Destination from "../pages/Destination/Destination";
import SearchResults from "../pages/Find/SearchResults";
import Contact from "../pages/Contact/Contact";
import Wishlist from "../pages/Wishlist/Wishlist";
import MyTrip from "../pages/MyTrips/MyTrips";
import Profile from "../pages/Profile/Profile";
import Hotels from '../pages/Hotels/Hotels'
import HotelDetails from '../pages/Hotels/HotelDetails'
import Flights from '../pages/Flights/Flight'
import FlightDetails from '../pages/Flights/FlightDetails'

import DestinationDetails from "../pages/Destination/DestinationDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="destination" element={<Destination/>} />
        <Route path="destination/:slug" element={<DestinationDetails/>} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/accommodation"
          element={<Hotels/>}/>
        <Route path='/accommodation/:id' element={<HotelDetails />}
        />
        <Route path="/flight" element={<Flights/>}/>
        <Route path='/flight/:id' element={<FlightDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-trip" element={<MyTrip />} />
        <Route path="/profile" element={<Profile />} />
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
