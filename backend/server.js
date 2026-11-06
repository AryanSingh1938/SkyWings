require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173"
    })
);

app.use(express.json());

// Basic health-check route.
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Flight Booking API is running"
    });
});

// API routes.
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

// Handle unknown routes.
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const startServer = async () => {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
        console.error("MONGO_URI and JWT_SECRET must be configured");
        process.exit(1);
    }

    await connectDB();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startServer();