const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query;
  console.log("query", req.query);
  res.json({
    data: await service.list(date),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
