function notFound(req, res, next) {
  const error = new Error(`Route ${req.method} ${req.originalUrl} tidak ditemukan`);
  error.status = 404;
  next(error);
}
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = err.status || (err.type === "entity.parse.failed" ? 400 : 500);
  const message = err.type === "entity.parse.failed"
    ? "Format JSON tidak valid"
    : (err.message || "Terjadi kesalahan pada server");
  res.status(status).json({ status: "error", message, data: null });
}
module.exports = { notFound, errorHandler };
