const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query;
  //console.log("query", req.query);
  //console.log("for date:", date, "reservations are:", await service.list(date));
  res.json({
    data: await service.list(date),
  });
}

async function create(req, res) {
  const reservation = req.body;
  res.json({
    data: await service.create(reservation),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create)
};
