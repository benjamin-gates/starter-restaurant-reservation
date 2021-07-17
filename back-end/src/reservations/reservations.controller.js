const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
  //console.log('reservation date', reservationDate, 'todaysDate', todaysDate);
  if(reservationDate < todaysDate){
    next({status: 400, message: "Reservations may only be made on future dates."});
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

async function statusIsBooked(req, res, next){
  const {status} = req.body;
  const {reservation_id} = req.params;
  const reservation = await service.read(reservation_id);
  if(status === "seated" && reservation.status !== "booked"){
    next({status: 400, message: "Reservation status must be 'booked' in order to seat a reservation"});
  } else {
    next();
  }
}

/**
 * Handlers for reservation resources
 */

async function list(req, res) {
  const query = req.query;
  let updatedQuery = {};
  for(let key in query){
    if(key === "mobile_phone"){
      updatedQuery = {
        mobile_number: query[key]
      };
    } else if (key === "date"){
      updatedQuery = {
        reservation_date: query[key]
      };
    } else {
        next({status: 400, message: `Query key: ${key} does not match your conditionals.`});
      }
  }
  res.json({
    data: await service.list(updatedQuery),
  });
}

async function create(req, res) {
  const reservation = req.body;
  res.json({
    data: await service.create(reservation),
  });
}

async function updateStatus(req, res, next){
  const {reservation_id} = req.params;
  const {status} = req.body;
  res.json({
    data: await service.updateStatus(reservation_id, status),
  });
}

async function read(req, res, next){
  const {reservation_id} = req.params;
  res.json({
    data: await service.read(reservation_id)
  });
}

async function editReservation(req, res, next){
  const {reservation_id} = req.params;
  const reservation = req.body;
  console.log('reservation', reservation);
  res.json({
    data: await service.updateReservation(reservation_id, reservation)
  });
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [currentOrFutureDate, notTuesday, eligibleTimeframe,asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(statusIsBooked), asyncErrorBoundary(updateStatus)],
  read: asyncErrorBoundary(read),
  editReservation: [currentOrFutureDate, notTuesday, eligibleTimeframe, asyncErrorBoundary(editReservation)]
};
