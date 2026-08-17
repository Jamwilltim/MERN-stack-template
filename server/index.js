const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

const { notFound, errorHandler } = require("./middleware/error");

const connectDB = require("./config/database");

dotenv.config();

const app = express();

// Core middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
});

// Route mounts
app.use("/api/auth", require("./routes/auth"));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
