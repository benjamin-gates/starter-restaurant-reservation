const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

/**
 *  Helper functions for reservations route:
 */ 

// Takes body of request, if request scheduled for a Tuesday, then an error is returned
function notTuesday(req, res, next){
  const {reservation_date} = req.body;
  const date = new Date(reservation_date);
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

// If reservation is scheduled outside of plausible serving hours, then an error is returned
function eligibleTimeframe(req, res, next){
  const {reservation_time} = req.body;
  const lateCutoff = "21:30";
  const earlyCutoff = "10:30";
  if(reservation_time > lateCutoff || reservation_time < earlyCutoff){
    next({status: 400, message: "Reservations must be made between 10:30 AM and 9:30 PM."});
  } else {
    next();
  }
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query;
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
  create: [notTuesday, currentOrFutureDate, eligibleTimeframe,asyncErrorBoundary(create)]
};
