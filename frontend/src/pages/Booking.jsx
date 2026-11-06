import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import api from "../services/api";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchFlight() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/flights/${id}`);

        if (!ignore) {
          setFlight(response.data.flight);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Unable to load this flight."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchFlight();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/bookings", {
        flightId: id,
        passengers: Number(passengers),
      });

      navigate("/my-bookings", {
        replace: true,
        state: { bookingSuccess: true },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to book this flight."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="px-5 py-16 text-center text-slate-500">
        Loading flight details...
      </main>
    );
  }

  if (error && !flight) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-red-600">{error}</p>
        <Link
          to="/"
          className="mt-4 inline-block font-semibold text-blue-600"
        >
          Back to home
        </Link>
      </main>
    );
  }

  if (!flight) return null;

  const totalPrice = flight.price * passengers;

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-10">
      <Link
        to={`/flights?source=${encodeURIComponent(
          flight.source
        )}&destination=${encodeURIComponent(flight.destination)}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
      >
        <ArrowLeft size={16} />
        Back to flights
      </Link>

      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
        Complete your booking
      </h1>
      <p className="mt-2 text-slate-500">
        Review your flight and select your passengers.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Plane size={24} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {flight.airline}
              </h2>
              <p className="text-sm text-slate-500">
                Flight {flight.flightNumber}
              </p>
            </div>
          </div>

          <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <p className="text-2xl font-bold">
                {new Date(flight.departureTime).toLocaleTimeString(
                  "en-IN",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {flight.source}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(flight.departureTime).toLocaleDateString(
                  "en-IN"
                )}
              </p>
            </div>

            <div className="text-center text-blue-600">
              <Plane size={20} />
              <div className="my-2 h-px w-12 bg-slate-200" />
              <span className="text-xs text-slate-500">Direct</span>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {new Date(flight.arrivalTime).toLocaleTimeString(
                  "en-IN",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {flight.destination}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(flight.arrivalTime).toLocaleDateString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              Available seats: {flight.availableSeats}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Price per passenger: ₹
              {flight.price.toLocaleString("en-IN")}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Booking summary
          </h2>

          <form onSubmit={handleBooking} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="passengers"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Number of passengers
              </label>
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                {Array.from(
                  { length: Math.min(9, flight.availableSeats) },
                  (_, i) => i + 1
                ).map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "passenger" : "passengers"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>₹{flight.price.toLocaleString("en-IN")} × {passengers}</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={
                submitting ||
                flight.availableSeats < 1 ||
                passengers > flight.availableSeats
              }
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {submitting ? "Confirming..." : "Confirm Booking"}
            </button>

            <p className="text-xs leading-5 text-slate-500">
              Demo booking only. No payment is collected.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}