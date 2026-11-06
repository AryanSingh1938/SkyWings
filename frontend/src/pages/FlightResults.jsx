import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import api from "../services/api";
import FlightCard from "../components/FlightCard";

export default function FlightResults() {
  const [searchParams] = useSearchParams();

  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchFlights() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/flights", {
          params: { source, destination, date },
        });

        if (!ignore) {
          setFlights(response.data.flights);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ||
              "Could not load flights. Check that your backend is running."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchFlights();

    return () => {
      ignore = true;
    };
  }, [source, destination, date]);

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to search
      </Link>

      <div className="mt-6 rounded-2xl bg-blue-600 p-6 text-white">
        <p className="text-sm text-blue-100">Your search</p>
        <h1 className="mt-2 text-2xl font-extrabold">
          {source} → {destination}
        </h1>
        <p className="mt-2 text-sm text-blue-100">
          Departure: {date || "Any date"}
        </p>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900">
          Available flights
        </h2>
        {!loading && !error && (
          <span className="text-sm text-slate-500">
            {flights.length} found
          </span>
        )}
      </div>

      {loading && (
        <p className="py-12 text-center text-slate-500">
          Searching for flights...
        </p>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && flights.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Search className="mx-auto text-slate-400" size={36} />
          <h3 className="mt-4 font-bold text-slate-900">
            No flights found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another date or change your departure and destination cities.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Search again
          </Link>
        </div>
      )}

      {!loading && !error && flights.length > 0 && (
        <div className="space-y-5">
          {flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </main>
  );
}
