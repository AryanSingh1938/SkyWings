const Flight = require("../models/Flight");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getFlights = async(req, res) => {
    try {
        const { source, destination, date } = req.query;
        const filter = {};

        if(source){
            filter.source = {
                $regex: `${escapeRegex(source.trim())}`,
                $options: "i"
            };
        }

        if(destination){
            filter.destination = {
                $regex: `^${escapeRegex(destination.trim())}`,
                $options: "i"
            };
        }

        if(date) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return res.status(400).json({
                    message: "Date must use YYYY-MM-DD format"
                });
            }

            const start = new Date(`${date}T00:00:00.000Z`);

            if (
                Number.isNaN(start.getTime()) ||
                start.toISOString().slice(0, 10) !== date
            ) {
                return res.status(400).json({
                    message: "Invalid date"
                });
            }
             const end = new Date(start);
            end.setUTCDate(end.getUTCDate() + 1);

            filter.departureTime = {
                $gte: start,
                $lt: end
            };
        } else {
            filter.departureTime = { $gte: new Date() };
        }

        filter.departureTime = {
            ...(filter.departureTime || {}),
            $gte: filter.departureTime?.$gte || new Date()
        };

        const flights = await Flight.find(filter)
            .sort({ departureTime: 1 });

        return res.status(200).json({
            count: flights.length,
            flights
        });
    } catch (error) {
        console.error("Flight search error:", error);

        return res.status(500).json({
            message: "Unable to search flights"
        });
    }
};

const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({
                message: "Flight not found"
            });
        }

        return res.status(200).json({ flight });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid flight ID"
            });
        }

        console.error("Get flight error:", error);

        return res.status(500).json({
            message: "Unable to retrieve flight"
        });
    }
};

module.exports = {
    getFlights,
    getFlightById
};