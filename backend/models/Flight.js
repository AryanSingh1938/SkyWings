const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            trim: true
        },
        airline: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "Available seats must be an integer"
            }
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Flight", flightSchema);