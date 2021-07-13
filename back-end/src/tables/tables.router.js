const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/new").post(controller.create);

module.exports = router;


