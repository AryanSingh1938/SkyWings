const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const createBooking = async(req, res) => {
    let reservedFlight = null;

    try {
        const { flightId, passengers } = req.body;

        if (
            typeof flightId !== "string" ||
            !mongoose.isValidObjectId(flightId)
        ) {
            return res.status(400).json({
                message: "A valid flight ID is required"
            });
        }
        if (
            !Number.isInteger(passengers) ||
            passengers < 1 ||
            passengers > 9
        ) {
            return res.status(400).json({
                message: "Passengers must be an integer between 1 and 9"
            });
        }

        reservedFlight = await Flight.findOneAndUpdate(
            {
                _id: flightId,
                departureTime: { $gt: new Date() },
                availableSeats: { $gte: passengers }
            },
            {
                $inc: { availableSeats: -passengers }
            },
            { new: true }
        );

        if (!reservedFlight) {
            const flight = await Flight.findById(flightId);

            if (!flight) {
                return res.status(404).json({
                    message: "Flight not found"
                });
            }

            return res.status(409).json({
                message: "Flight has departed or not enough seats are available"
            });
        }
        const totalPrice = reservedFlight.price * passengers;

        const booking = await Booking.create({
            user: req.userId,
            flight: reservedFlight._id,
            passengers,
            totalPrice,
            status: "confirmed"
        });

        return res.status(201).json({
            message: "Flight booked successfully",
            booking
        });
    } catch (error) {
        // Restore the seats if saving the booking failed.
         if (reservedFlight) {
            try {
                await Flight.updateOne(
                    { _id: reservedFlight._id },
                    { $inc: { availableSeats: req.body.passengers } }
                );
            } catch (rollbackError) {
                console.error("Seat restoration failed:", rollbackError);
            }
        }

        // Reserve seats atomically so concurrent requests cannot
        // reserve more seats than are available.

        console.error("Create booking error:", error);

        return res.status(500).json({
            message: "Unable to create booking"
        });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.userId
        })
            .populate(
                "flight",
                "flightNumber airline source destination departureTime arrivalTime price"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error("Get bookings error:", error);

        return res.status(500).json({
            message: "Unable to retrieve bookings"
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid booking ID"
            });
        }

        // Only the owner can cancel their booking.
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        // Prevent two concurrent cancellation requests from
        // restoring the same seats twice.
        const cancelledBooking = await Booking.findOneAndUpdate(
            {
                _id: booking._id,
                user: req.userId,
                status: "confirmed"
            },
            {
                $set: { status: "cancelled" }
            },
            { new: true }
        );

        if (!cancelledBooking) {
            return res.status(409).json({
                message: "Booking has already been cancelled"
            });
        }

        await Flight.updateOne(
            { _id: booking.flight },
            { $inc: { availableSeats: booking.passengers } }
        );

        return res.status(200).json({
            message: "Booking cancelled successfully",
            booking: cancelledBooking
        });
    } catch (error) {
        console.error("Cancel booking error:", error);

        return res.status(500).json({
            message: "Unable to cancel booking"
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking
};
