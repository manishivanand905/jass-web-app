require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MAX_PORT_ATTEMPTS = 10;

const explicitOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "").split(",").map((o) => o.trim()),
].filter(Boolean);

const isLocalDevOrigin = (origin) => {
  try {
    const { hostname, protocol } = new URL(origin);
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const isHttp = protocol === "http:" || protocol === "https:";
    return isLocalhost && isHttp;
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isExplicitlyAllowed = explicitOrigins.includes(origin);
      const isVercelPreview = origin.endsWith(".vercel.app");
      const isLocalDevelopment = isLocalDevOrigin(origin);

      if (isExplicitlyAllowed || isVercelPreview || isLocalDevelopment) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.get("/api/health", (_req, res) => {
  const dbState = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    status: "ok",
    db: dbState[require("mongoose").connection.readyState] || "unknown",
  });
});

app.get("/", (_req, res) => {
  res.json({ message: "Jass Automotives API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/search", searchRoutes);

app.use(errorHandler);

const startListening = (initialPort) =>
  new Promise((resolve, reject) => {
    const tryPort = (port, attemptsLeft) => {
      const server = app.listen(port);

      server.once("listening", () => {
        resolve({ server, port });
      });

      server.once("error", (error) => {
        server.close(() => {
          if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
            const nextPort = port + 1;
            console.warn(
              `Port ${port} is already in use. Trying port ${nextPort}...`
            );
            tryPort(nextPort, attemptsLeft - 1);
            return;
          }

          if (error.code === "EADDRINUSE") {
            reject(
              new Error(
                `Ports ${initialPort}-${port} are in use. Stop the existing process or set PORT to a different value.`
              )
            );
            return;
          }

          if (error.code === "EACCES") {
            reject(new Error(`Port ${port} requires elevated privileges.`));
            return;
          }

          reject(error);
        });
      });
    };

    tryPort(initialPort, MAX_PORT_ATTEMPTS);
  });

const startServer = async () => {
  try {
    await connectDB();
    const { port } = await startListening(PORT);
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
