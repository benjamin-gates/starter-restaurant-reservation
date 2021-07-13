const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Helper functions for reservations route:

// Takes body of request, if request scheduled for a Tuesday, then an error is returned
function notTuesday(req, res, next){
  const {reservation_date} = req.body;
  const date = new Date(reservation_date);
  //console.log('date:', date, 'reservation_date', reservation_date);
  if(date.getDay() === 1){
    next({status: 400, message: "Restaurant is closed on Tuesdays."});
  } else{
    next();
  }
}

// If reservation is scheduled on a date before today's date, then an error is returned
function currentOrFutureDate(req, res, next){
  const {reservation_date} = req.body;
  const reservationDate = new Date(reservation_date);
  const todaysDate = new Date();
  if(reservationDate < todaysDate){
    next({status: 400, message: "Reservations may not be made on past dates."});
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
  create: [notTuesday, currentOrFutureDate, asyncErrorBoundary(create)]
};
