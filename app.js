require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");

const {
  errorHandler,
  notFound,
} = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware umum
app.use(logger);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Membaca JSON
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    message: "RESTful API Mahasiswa berjalan",
  });
});

// Route mahasiswa
app.use("/mahasiswa", mahasiswaRoutes);

// 404 jika route tidak ditemukan
app.use(notFound);

// Error handler harus paling akhir
app.use(errorHandler);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});