const mahasiswaModel = require("../models/mahasiswaModel");

function getAll(req, res) {
  const { jurusan } = req.query;

  const data = mahasiswaModel.getAll(jurusan);

  res.json(data);
}

function getById(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const error = new Error("ID harus berupa angka");
    error.status = 400;
    return next(error);
  }

  const data = mahasiswaModel.getById(id);

  if (!data) {
    const error = new Error("Data mahasiswa tidak ditemukan");
    error.status = 404;
    return next(error);
  }

  res.json(data);
}

function create(req, res, next) {
  const { nama, jurusan } = req.body;

  if (!nama || !jurusan) {
    const error = new Error("nama dan jurusan wajib diisi");
    error.status = 400;
    return next(error);
  }

  const data = mahasiswaModel.create({
    nama,
    jurusan,
  });

  res.status(201).json(data);
}

function update(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const error = new Error("ID harus berupa angka");
    error.status = 400;
    return next(error);
  }

  const { nama, jurusan } = req.body;

  if (!nama || !jurusan) {
    const error = new Error("nama dan jurusan wajib diisi");
    error.status = 400;
    return next(error);
  }

  const data = mahasiswaModel.update(id, {
    nama,
    jurusan,
  });

  if (!data) {
    const error = new Error("Data mahasiswa tidak ditemukan");
    error.status = 404;
    return next(error);
  }

  res.json(data);
}

function remove(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const error = new Error("ID harus berupa angka");
    error.status = 400;
    return next(error);
  }

  const berhasil = mahasiswaModel.remove(id);

  if (!berhasil) {
    const error = new Error("Data mahasiswa tidak ditemukan");
    error.status = 404;
    return next(error);
  }

  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};