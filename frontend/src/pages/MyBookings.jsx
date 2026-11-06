import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, Plane, XCircle } from "lucide-react";
import api from "../services/api";

function formatDate(value) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MyBookings() {
  const location = useLocation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(
    location.state?.bookingSuccess
      ? "Your booking was created successfully."
      : ""
  );
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/bookings/my");
      setBookings(response.data.bookings);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load your bookings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setCancellingId(bookingId);
    setError("");
    setMessage("");

    try {
      const response = await api.patch(
        `/bookings/${bookingId}/cancel`
      );

      setMessage(response.data.message);
      await fetchBookings();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to cancel booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            YOUR TRIPS
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            My Bookings
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage your flight reservations.
          </p>
        </div>

        <Link
          to="/"
          className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Book another flight
        </Link>
      </div>

      {message && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loading && (
        <p className="py-16 text-center text-slate-500">
          Loading your bookings...
        </p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Plane className="mx-auto text-slate-400" size={36} />
          <h2 className="mt-4 text-lg font-bold text-slate-900">
            No bookings yet
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Search for a flight and book your first trip.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block font-semibold text-blue-600"
          >
            Find flights
          </Link>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="mt-8 space-y-5">
          {bookings.map((booking) => {
            const flight = booking.flight;

            return (
              <article
                key={booking._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Plane size={22} />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">
                        {flight
                          ? `${flight.source} → ${flight.destination}`
                          : "Flight details unavailable"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Booking ID: {booking._id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {flight && (
                  <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-500">Airline</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {flight.airline} · {flight.flightNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Departure</p>
                      <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                        <CalendarDays size={16} className="text-blue-600" />
                        {formatDate(flight.departureTime)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Passengers</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {booking.passengers}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Total price</p>
                      <p className="mt-1 text-xl font-extrabold text-slate-900">
                        ₹{booking.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                )}

                {booking.status === "confirmed" && (
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <XCircle size={16} />
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel booking"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}