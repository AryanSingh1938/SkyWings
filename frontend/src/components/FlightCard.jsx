import { Link } from "react-router-dom";
import { PlaneTakeoff, PlaneLanding, Clock } from "lucide-react";

function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getDuration(departure, arrival) {
  const minutes = Math.round(
    (new Date(arrival) - new Date(departure)) / 60000
  );

  if (minutes < 0) return "—";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

export default function FlightCard({ flight }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {flight.airline}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Flight {flight.flightNumber}
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {flight.availableSeats} seats left
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="text-2xl font-bold text-slate-900">
            {formatTime(flight.departureTime)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.source}
          </p>
          <PlaneTakeoff className="mt-3 text-blue-600" size={20} />
        </div>

        <div className="flex min-w-20 flex-col items-center">
          <span className="text-xs text-slate-500">
            <Clock size={13} className="mr-1 inline" />
            {getDuration(
              flight.departureTime,
              flight.arrivalTime
            )}
          </span>
          <div className="my-2 h-px w-full bg-slate-200" />
          <span className="text-xs text-slate-500">Direct</span>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">
            {formatTime(flight.arrivalTime)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {flight.destination}
          </p>
          <PlaneLanding
            className="ml-auto mt-3 text-blue-600"
            size={20}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-xs text-slate-500">Price per passenger</p>
          <p className="text-2xl font-extrabold text-slate-900">
            ₹{flight.price?.toLocaleString("en-IN")}
          </p>
        </div>

        <Link
          to={`/booking/${flight._id}`}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Book Flight
        </Link>
      </div>
    </article>
  );
}
