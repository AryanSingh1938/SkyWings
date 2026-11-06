import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FlightResults from "./pages/FlightResults";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/flights" element={<FlightResults />} />
          <Route path="/profile" element={<Profile />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>

          <Route
            path="*"
            element={
              <main className="px-5 py-20 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900">
                  404 — Page not found
                </h1>
                <a
                  href="/"
                  className="mt-4 inline-block font-semibold text-blue-600"
                >
                  Back to home
                </a>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
