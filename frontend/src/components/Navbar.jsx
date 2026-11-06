import { Link, NavLink, useNavigate } from "react-router-dom";
import { Plane, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive
        ? "text-blue-600 font-bold"
        : "text-slate-600 hover:text-blue-600"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="rounded-xl bg-blue-600 p-2 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition">
            <Plane size={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
            Sky<span className="text-blue-600">Wings</span>
          </span>
        </Link>

        {/* Center / Right Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/flights" className={navClass}>
            Flights
          </NavLink>

          <a
            href="/#travel-guidelines"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition hidden sm:inline"
          >
            Guidelines
          </a>

          {isAuthenticated && (
            <NavLink to="/my-bookings" className={navClass}>
              My Bookings
            </NavLink>
          )}

          {/* Profile Nav Link */}
          <NavLink to="/profile" className={navClass}>
            Profile
          </NavLink>

          {/* Profile Icon Button & Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Clickable Profile Icon & Name */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:border-blue-400 hover:bg-blue-50/60 transition shadow-sm"
                title="Click to view your profile"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <UserRound size={14} />
                </div>
                <span>{user?.name || "Profile"}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                title="Log out"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Clickable Profile Icon when logged out */}
              <Link
                to="/profile"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-blue-400 hover:bg-blue-50 transition"
                title="Click to view profile info"
              >
                <UserRound size={15} className="text-blue-600" />
                <span>Profile</span>
              </Link>

              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
