import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeftRight,
  PlaneTakeoff,
  PlaneLanding,
  Calendar as CalendarIcon,
  X,
  Building2,
  Globe2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { AIRPORTS } from "../data/airports";

function getTodayString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000)
    .toISOString()
    .slice(0, 10);
}

function formatDateDisplay(dateString) {
  if (!dateString) return "Select date";
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Subcomponent: Custom Airline Calendar Picker
function CustomDatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current value or fallback to today
  const selectedDateObj = value ? new Date(value + "T00:00:00") : new Date();

  const [viewYear, setViewYear] = useState(selectedDateObj.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDateObj.getMonth()); // 0-indexed

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const todayStr = getTodayString();
  const todayDate = new Date(todayStr + "T00:00:00");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    // Prevent going before current month
    const currentMonthDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
    const prevMonthDate = new Date(viewYear, viewMonth - 1, 1);
    if (prevMonthDate < currentMonthDate) return;

    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Generate calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday

  const daysArray = [];
  // Empty padding slots
  for (let i = 0; i < firstDayWeekday; i++) {
    daysArray.push(null);
  }
  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const handleSelectDay = (day) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const newDateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;
    onChange(newDateStr);
    setIsOpen(false);
  };

  const handleQuickSelect = (daysOffset) => {
    const target = new Date();
    target.setDate(target.getDate() + daysOffset);
    const offset = target.getTimezoneOffset();
    const str = new Date(target.getTime() - offset * 60_000)
      .toISOString()
      .slice(0, 10);
    onChange(str);
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
    setIsOpen(false);
  };

  const canGoPrev = new Date(viewYear, viewMonth - 1, 1) >= new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor="departure-date"
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
      >
        Departure Date
      </label>

      {/* Trigger Button */}
      <button
        id="departure-date"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white py-3 pl-3.5 pr-4 text-left transition hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarIcon size={18} />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-900 leading-tight">
              {formatDateDisplay(value)}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {value === todayStr ? "Today" : "Scheduled Departure"}
            </span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Floating Modern Calendar Dropdown */}
      {isOpen && (
        <div className="absolute right-0 left-0 sm:left-auto sm:w-80 z-50 mt-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
          {/* Quick Date Select Chips */}
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-3 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => handleQuickSelect(0)}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(1)}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(3)}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              +3 Days
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(7)}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              +1 Week
            </button>
          </div>

          {/* Month & Year Navigation Header */}
          <div className="flex items-center justify-between px-1 mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={!canGoPrev}
              className={`rounded-xl p-1.5 transition ${
                canGoPrev
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 cursor-not-allowed"
              }`}
              title="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="font-extrabold text-sm text-slate-900 font-display">
              {monthNames[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded-xl p-1.5 text-slate-700 hover:bg-slate-100 transition"
              title="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysArray.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-8 w-8" />;
              }

              const formattedMonth = String(viewMonth + 1).padStart(2, "0");
              const formattedDay = String(day).padStart(2, "0");
              const thisDateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;

              const isPast = thisDateStr < todayStr;
              const isSelected = thisDateStr === value;
              const isToday = thisDateStr === todayStr;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`flex h-8 w-8 mx-auto items-center justify-center rounded-xl text-xs font-bold transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : isPast
                      ? "text-slate-300 cursor-not-allowed"
                      : isToday
                      ? "bg-blue-50 text-blue-700 font-black ring-1 ring-blue-400 hover:bg-blue-100"
                      : "text-slate-800 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" /> Selected date
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-400/50 inline-block" /> Today
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Searchable Airport Input with Dropdown
function AirportSelector({
  label,
  id,
  value,
  onChange,
  onSelectAirport,
  icon: Icon,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAirports = AIRPORTS.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const query = searchTerm.trim().toLowerCase();
    if (!query) return matchesTab;

    const matchesQuery =
      item.city.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.airport.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query);

    return matchesTab && matchesQuery;
  });

  const handleSelect = (airport) => {
    onSelectAirport(airport.city);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600"
      >
        {label}
      </label>

      {/* Input Box */}
      <div className="relative">
        <Icon className="absolute left-3.5 top-3.5 text-blue-600" size={18} />
        <input
          id={id}
          type="text"
          value={value}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm("");
          }}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-2xl border border-slate-200 py-3.5 pl-11 pr-9 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          required
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearchTerm("");
            }}
            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
            title="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in duration-150">
          {/* Header tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/80 p-2 gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex-1 rounded-xl py-1.5 font-bold transition ${
                activeTab === "all"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Airports
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("Domestic")}
              className={`flex-1 rounded-xl py-1.5 font-bold transition flex items-center justify-center gap-1 ${
                activeTab === "Domestic"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 size={13} />
              India ({AIRPORTS.filter((a) => a.type === "Domestic").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("International")}
              className={`flex-1 rounded-xl py-1.5 font-bold transition flex items-center justify-center gap-1 ${
                activeTab === "International"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Globe2 size={13} />
              International ({AIRPORTS.filter((a) => a.type === "International").length})
            </button>
          </div>

          {/* List of matching airports */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 p-1">
            {filteredAirports.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No airports found matching "{searchTerm}"
              </div>
            ) : (
              filteredAirports.map((airport) => (
                <button
                  key={`${airport.code}-${airport.city}`}
                  type="button"
                  onClick={() => handleSelect(airport)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-mono text-xs font-black text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition">
                      {airport.code}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 truncate">
                          {airport.city}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {airport.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {airport.airport}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 ${
                      airport.type === "Domestic"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {airport.type === "Domestic" ? "India" : "Intl"}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchForm() {
  const navigate = useNavigate();

  const [source, setSource] = useState("Delhi");
  const [destination, setDestination] = useState("Mumbai");
  const [date, setDate] = useState(getTodayString());
  const [error, setError] = useState("");

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!source.trim() || !destination.trim() || !date) {
      setError("Please complete all the search fields.");
      return;
    }

    if (source.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError("Departure and arrival destinations cannot be the same airport.");
      return;
    }

    const params = new URLSearchParams({
      source: source.trim(),
      destination: destination.trim(),
      date,
    });

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl shadow-blue-950/10 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Search size={18} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 font-display">
              Find your flight
            </h2>
            <p className="text-xs text-slate-500">
              Select from all Indian domestic airports and top international destinations
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 items-end">
        {/* FROM AIRPORT SELECTOR */}
        <div className="lg:col-span-4">
          <AirportSelector
            id="source"
            label="From (Departure Airport)"
            value={source}
            onChange={setSource}
            onSelectAirport={setSource}
            icon={PlaneTakeoff}
            placeholder="Select departure airport or city"
          />
        </div>

        {/* SWAP BUTTON */}
        <div className="flex justify-center -my-2 lg:my-0 lg:col-span-1 lg:items-center">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap departure and destination"
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-md text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition active:scale-95"
            title="Swap airports"
          >
            <ArrowLeftRight size={18} className="transition-transform group-hover:rotate-180 duration-300" />
          </button>
        </div>

        {/* TO AIRPORT SELECTOR */}
        <div className="lg:col-span-4">
          <AirportSelector
            id="destination"
            label="To (Arrival Airport)"
            value={destination}
            onChange={setDestination}
            onSelectAirport={setDestination}
            icon={PlaneLanding}
            placeholder="Select arrival airport or city"
          />
        </div>

        {/* CUSTOM DEPARTURE DATE PICKER */}
        <div className="lg:col-span-3">
          <CustomDatePicker
            value={date}
            onChange={setDate}
          />
        </div>

        {/* SEARCH BUTTON */}
        <div className="lg:col-span-12 mt-2">
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-indigo-800 hover:shadow-blue-600/35 active:scale-[0.99]"
          >
            <Search size={18} className="transition-transform group-hover:scale-110" />
            <span className="font-display tracking-wide text-base">Search Scheduled Flights</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}
    </form>
  );
}
