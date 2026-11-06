const express = require("express");

const {
    createBooking,
    getMyBookings,
    cancelBooking
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getMyBookings);
router.get("/my", authMiddleware, getMyBookings);
router.patch("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;