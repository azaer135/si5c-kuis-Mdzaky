function cekApiKey(req, res, next) {
  const apiKey = req.get("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    const error = new Error("API key tidak valid atau tidak disertakan");
    error.status = 401;
    return next(error);
  }
  next();
}
module.exports = cekApiKey;
