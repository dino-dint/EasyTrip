import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
// import { BookingProvider } from './context/BookingContext'
// import { WishProvider } from './context/WIshlistContext'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
