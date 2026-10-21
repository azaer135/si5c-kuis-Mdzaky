const model = require("../models-mahasiswaModel/model");
const JENIS_VALID = ["akademik", "olahraga", "seni", "sosial"];

function makeError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validasiBody(body) {
  const { nama, jenis, ketua, tahunBerdiri, jumlahAnggota } = body || {};
  if (typeof nama !== "string" || !nama.trim() ||
      typeof jenis !== "string" || !jenis.trim() ||
      typeof ketua !== "string" || !ketua.trim() ||
      jumlahAnggota === undefined || jumlahAnggota === null) {
    throw makeError("Field wajib: nama, jenis, ketua, dan jumlahAnggota harus diisi", 400);
  }
  if (!JENIS_VALID.includes(jenis)) {
    throw makeError("Jenis harus berupa akademik, olahraga, seni, atau sosial", 400);
  }
  if (typeof jumlahAnggota !== "number" || !Number.isFinite(jumlahAnggota) || jumlahAnggota < 0) {
    throw makeError("jumlahAnggota harus berupa angka dan tidak boleh negatif", 400);
  }
  if (tahunBerdiri !== undefined && (typeof tahunBerdiri !== "number" || !Number.isFinite(tahunBerdiri))) {
    throw makeError("tahunBerdiri harus berupa angka", 400);
  }
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw makeError("ID harus berupa bilangan bulat positif", 400);
  return id;
}

function getAll(req, res) {
  res.status(200).json(model.getAll(req.query.jenis));
}

function getById(req, res, next) {
  try {
    const id = parseId(req.params.id);
    const item = model.getById(id);
    if (!item) throw makeError(`Data organisasi mahasiswa dengan id ${id} tidak ditemukan`, 404);
    res.status(200).json(item);
  } catch (error) { next(error); }
}

function create(req, res, next) {
  try {
    validasiBody(req.body);
    const item = model.create(req.body);
    res.status(201).json({ status: "success", message: "Data organisasi mahasiswa berhasil ditambahkan", data: item });
  } catch (error) { next(error); }
}

function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!model.getById(id)) throw makeError(`Data organisasi mahasiswa dengan id ${id} tidak ditemukan`, 404);
    validasiBody(req.body);
    const item = model.update(id, req.body);
    res.status(200).json({ status: "success", message: `Data organisasi mahasiswa dengan id ${id} berhasil diperbarui`, data: item });
  } catch (error) { next(error); }
}

function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!model.remove(id)) throw makeError(`Data organisasi mahasiswa dengan id ${id} tidak ditemukan`, 404);
    res.status(200).json({ status: "success", message: `Data organisasi mahasiswa dengan id ${id} berhasil dihapus`, data: null });
  } catch (error) { next(error); }
}

module.exports = { getAll, getById, create, update, remove };
