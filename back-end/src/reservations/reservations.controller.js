const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Helper functions for reservations route:

// Takes body of request, if request scheduled for a Tuesday, then an error is returned
function notTuesday(req, res, next){
  const {reservation_date} = req.body;
  const date = new Date(reservation_date);
  //console.log('date:', date, 'reservation_date', reservation_date);
  console.log('day of the week', date.getDay());
  if(date.getDay() === 1){
    console.log('you got here');
    next({status: 400, message: 'Reservations made on Tuesdays are not allowed'})
  } else{
    next();
  }
}
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
  create: [notTuesday, asyncErrorBoundary(create)]
};
