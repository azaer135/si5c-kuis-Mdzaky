const express = require("express");

const router = express.Router();

const mahasiswaController = require("../controllers/mahasiswaController");
const cekApiKey = require("../middleware/cekApiKey");

// GET semua mahasiswa
router.get(
  "/",
  mahasiswaController.getAll
);

// GET mahasiswa berdasarkan ID
router.get(
  "/:id",
  mahasiswaController.getById
);

// POST mahasiswa
router.post(
  "/",
  cekApiKey,
  mahasiswaController.create
);

// PUT mahasiswa
router.put(
  "/:id",
  cekApiKey,
  mahasiswaController.update
);

// DELETE mahasiswa
router.delete(
  "/:id",
  cekApiKey,
  mahasiswaController.remove
);

module.exports = router;