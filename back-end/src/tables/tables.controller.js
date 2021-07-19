const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationController = require("../reservations/reservations.controller");
const reservationsController = require("../reservations/reservations.controller");

/**
 * Helper functions for /tables route
 */

// Returns a 400 error message if tables post request is missing fields
function correctBody(req, res, next) {
    if (!req.body.data) {
        next({
          status: 400,
          message: "A data object is required for this request.",
        });
      } 
    //console.log('req body', req.body, 'req.body.data', !req.body.data);
  const { table_name, capacity } = req.body.data;
  if (!table_name) {
    next({ status: 400, message: "A table_name is required." });
  } else if (table_name.length < 2) {
    next({
      status: 400,
      message: "The table_name must be at least 2 characters",
    });
  } else if (!capacity) {
    next({ status: 400, message: "A capacity is required." });
  } else {
    next();
  }
}

function updateCorrectBody(req, res, next){
    if(!req.body.data){
        next({ status: 400, message: "A data object is required in the body of this request."});
    } 
    const {reservation_id} = req.body.data;
    if(!reservation_id){
        next({ status: 400, message: "A reservation_id is required."});
    } else {
        next();
    }
}

// Returns an error if the table is already occupied by a reservation
async function tableOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  if (table.reservation_id) {
    next({
      status: 400,
      message: `${table.table_name} is currently occupied.`,
    });
  } else {
    res.locals.table = table;
    next();
  }
}
// Returns an error if the reservation_id does not exist
async function reservationExists(req, res, next){
    const { reservation_id } = req.body.data;
    const reservation = await service.readReservation(reservation_id);
    if(!reservation){
        next({ status: 404, message: `Reservation #${reservation_id} does not exist.`})
    } else {
        res.locals.reservation = reservation;
        next();
    }
}

// Returns an error if the number of people in the reservation is greater than the table's capacity
function enoughSeats(req, res, next) {
  const { reservation_id } = req.body.data;
  const table = res.locals.table;
  const reservation = res.locals.reservation;
  //console.log('enough room at the table?', table.capacity >= reservation.people);
  if (reservation.people > table.capacity) {
    next({
      status: 400,
      message: `${table.table_name} does not have sufficient capacity to occupy reservation ${reservation_id}`,
    });
  } else {
    next();
  }
}

// Returns an error if the table is not already occupied by a reservation
async function tableNotOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  if (!table.reservation_id) {
    next({
      status: 400,
      message: `${table.table_name} is not currently occupied.`,
    });
  } else {
    next();
  }
}

/**
 * Handler functions for /tables route
 */

async function list(req, res, next) {
  res.status(200).json({ data: await service.list() });
}

async function create(req, res, next) {
  const table = req.body.data;
  res.status(201).json({ data: await service.create(table) });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  res.json({ data: await service.update(table_id, reservation_id) });
}

async function destroyReservation(req, res, next) {
  const { table_id } = req.params;
  console.log("table id", table_id, "type", typeof table_id);
  await service.delete(table_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [correctBody, asyncErrorBoundary(create)],
  update: [
    updateCorrectBody,asyncErrorBoundary(tableOccupied),
    asyncErrorBoundary(reservationExists),enoughSeats,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableNotOccupied),
    asyncErrorBoundary(destroyReservation),
  ],
};
