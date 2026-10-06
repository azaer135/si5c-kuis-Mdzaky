function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server",
  });
}

function notFound(req, res, next) {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  );

  error.status = 404;

  next(error);
}

module.exports = {
  errorHandler,
  notFound,
};