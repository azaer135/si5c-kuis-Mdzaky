const express = require("express");
const controller = require("../controller/controller");
const cekApiKey = require("../middleware/apikey");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", cekApiKey, controller.create);
router.put("/:id", cekApiKey, controller.update);
router.delete("/:id", cekApiKey, controller.remove);

module.exports = router;
