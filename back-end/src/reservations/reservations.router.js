/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list);

router.route("/new").post(controller.create);

router.route("/:reservation_id/status").put(controller.updateStatus);

module.exports = router;
