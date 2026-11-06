import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plane, ShieldCheck, Headphones, Sparkles, Award } from "lucide-react";
import SearchForm from "../components/SearchForm";
import TravelGuidelines from "../components/TravelGuidelines";

export default function Home() {
  const location = useLocation();

  // Scroll to anchor if hash is present
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  const hashKey = location.hash ? location.hash.replace("#", "") : "baggage";

  return (
    <main className="min-h-screen bg-slate-50/70 selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-28 pt-16 md:grid-cols-2 md:pb-36 md:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Official Air Travel Booking Engine</span>
              <span className="text-white/40">•</span>
              <span className="text-white">500+ Indian & Global Hubs</span>
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl font-display">
              Explore the world,
              <span className="block mt-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                one flight at a time.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-slate-300">
              Find flights across all Indian domestic airports and international destinations, compare transparent fares, and manage your journeys effortlessly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                Zero Hidden Charges
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={16} className="text-amber-400" />
                Guaranteed Best Fares
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={16} className="text-cyan-400" />
                Instant Confirmation
              </span>
            </div>
          </div>

          <div className="hidden justify-center md:flex">
            <div className="flex h-72 w-72 rotate-3 items-center justify-center rounded-[3rem] border border-white/15 bg-white/5 shadow-2xl backdrop-blur-md">
              <Plane
                size={140}
                strokeWidth={1}
                className="-rotate-12 text-cyan-300 transition-transform duration-500 hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIND YOUR FLIGHT (SEARCH WIDGET) */}
      <section className="relative mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
        <SearchForm />
      </section>

      {/* 3. TRAVEL GUIDELINES COMPONENT (4 KEY TOPICS) */}
      <TravelGuidelines
        initialSelectedId={
          ["baggage", "checkin", "idproof", "meals"].includes(hashKey)
            ? hashKey
            : "baggage"
        }
      />

      {/* 4. FEATURES & TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl font-display">
            Travel With Complete Peace of Mind
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Engineered for a modern, transparent, and seamless flight booking journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            icon={<Plane size={24} />}
            title="Complete Airport Network"
            description="Select from 50+ domestic Indian airports and 40+ international hub destinations with instant airport lookup."
          />
          <Feature
            icon={<ShieldCheck size={24} />}
            title="Simplified Booking Management"
            description="Access your confirmed reservations, download tickets, or manage flight cancellations seamlessly."
          />
          <Feature
            icon={<Headphones size={24} />}
            title="Transparent Fare & Travel Info"
            description="Clear baggage allowances, web check-in guidelines, seat selection, and 24/7 passenger assistance."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md hover:border-blue-200">
      <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
        {icon}
      </div>
      <h3 className="font-extrabold text-base text-slate-900 font-display">{title}</h3>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}
