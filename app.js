require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const organizationRoutes = require("./route/route");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    namaMahasiswa: "M.Dzaky Aburrahman",
    nim: "2428240148p",
    nomorTopik: 38,
    message: "RESTful API Unit Kegiatan Mahasiswa berjalan",
    endpoints: [
      "GET /student-organizations",
      "GET /student-organizations/:id",
      "GET /student-organizations?jenis=seni",
      "POST /student-organizations",
      "PUT /student-organizations/:id",
      "DELETE /student-organizations/:id"
    ]
  });
});

app.use("/student-organizations", organizationRoutes);
app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}

module.exports = app;
