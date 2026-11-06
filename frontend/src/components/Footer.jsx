import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Mail,
  Phone,
  ShieldCheck,
  Send,
  MapPin,
  Clock,
  Heart,
  CheckCircle2,
  Globe,
  Headphones,
  Award,
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                100% Safe Bookings
              </h4>
              <p className="text-[11px] text-slate-400">PCI-DSS secured checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/20">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                24/7 Flight Support
              </h4>
              <p className="text-[11px] text-slate-400">Assistance anytime anywhere</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/20">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Best Fare Guarantee
              </h4>
              <p className="text-[11px] text-slate-400">Zero hidden service fees</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/20">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Instant Refunds
              </h4>
              <p className="text-[11px] text-slate-400">Direct to original payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25">
                <Plane size={22} className="-rotate-12" />
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Sky<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Wings</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              SkyWings Airways is India's next-generation flight booking platform connecting travelers to over 500+ domestic airports and global destinations with live seat availability and transparent airfares.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Subscribe for Fare Drop Alerts
              </h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition flex items-center gap-1 shadow-md"
                >
                  <Send size={13} />
                  <span>Join</span>
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Subscribed! You will receive exclusive deal alerts.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
              Explore Flights
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/flights" className="hover:text-blue-400 transition">
                  Search All Flights
                </Link>
              </li>
            </ul>
          </div>

          {/* Passenger Info & Guidelines (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
              Travel Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/profile" className="hover:text-blue-400 transition">
                  Passenger Profile & Info
                </Link>
              </li>
              <li>
                <a
                  href="/#baggage"
                  className="hover:text-cyan-400 transition flex items-center justify-between group"
                >
                  <span>Cabin Baggage Rules (7kg Cabin + 15kg Check-in)</span>
                  <span className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition">View →</span>
                </a>
              </li>
              <li>
                <a
                  href="/#checkin"
                  className="hover:text-cyan-400 transition flex items-center justify-between group"
                >
                  <span>Web Check-In Window (48h to 60m Prior)</span>
                  <span className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition">View →</span>
                </a>
              </li>
              <li>
                <a
                  href="/#idproof"
                  className="hover:text-cyan-400 transition flex items-center justify-between group"
                >
                  <span>Airport Entry Identification Requirements</span>
                  <span className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition">View →</span>
                </a>
              </li>
              <li>
                <a
                  href="/#meals"
                  className="hover:text-cyan-400 transition flex items-center justify-between group"
                >
                  <span>In-Flight Special Meals & Assistance</span>
                  <span className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition">View →</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span>+91 (0) 11 4567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-400 shrink-0" />
                <span>support@skywings-airways.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-indigo-400 shrink-0" />
                <span>Terminal 3, IGI Airport, New Delhi, India</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/my-bookings"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition"
                >
                  Manage My Bookings →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Airport Networks Tag Cloud */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Major Indian & International Airport Network:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {[
              "Delhi (DEL)", "Mumbai (BOM)", "Bengaluru (BLR)", "Hyderabad (HYD)",
              "Kolkata (CCU)", "Chennai (MAA)", "Ahmedabad (AMD)", "Goa (GOI)",
              "Kochi (COK)", "Pune (PNQ)", "Jaipur (JAI)", "Lucknow (LKO)",
              "Dubai (DXB)", "London (LHR)", "Singapore (SIN)", "Bangkok (BKK)",
              "New York (JFK)", "Paris (CDG)", "Doha (DOH)", "Frankfurt (FRA)"
            ].map((airport, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-slate-800/60 border border-slate-700/60 px-2 py-0.5"
              >
                {airport}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Rights & Certification */}
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkyWings Airways Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Carriage</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Refund Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

