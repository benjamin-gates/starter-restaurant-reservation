const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 *  Helper functions for reservations route:
 */

// Checks to see if post request has all the proper fields
function fieldsExist(req, res, next) {
  const {
    first_name,
    last_name,
    reservation_date,
    reservation_time,
    people,
    mobile_number,
  } = req.body.data;
  console.log('req.body', req.body);
  //console.log("request body", req.body);
  if (!req.body.data) {
    res.sendStatus(400);
  } else if (!first_name || first_name.length === 0) {
    next({ status: 400, message: "The first_name field is required." });
  } else if (!last_name || last_name.length === 0) {
    next({ status: 400, message: "The last_name field is required." });
  } else if (!reservation_date || reservation_date === 0) {
    next({ status: 400, message: "The reservation_date field is required." });
  } else if (!reservation_time || reservation_time === 0) {
    next({ status: 400, message: "The reservation_time field is required." });
  } else if (!people || people.length === 0) {
    next({ status: 400, message: "The people field is required." });
  } else if (!mobile_number || mobile_number.length === 0) {
    next({ status: 400, message: "The mobile_number field is required." });
  } else {
    next();
  }
}

// Checks each field to see if they are in the correct format
function correctFormat(req, res, next) {
  const { first_name, last_name, reservation_date, reservation_time, people } =
    req.body.data;
  const formattedDate = new Date(reservation_date);
  const formattedTime = [typeof Number(reservation_time.substring(0,2)), reservation_time.substring(2,3), typeof Number(reservation_time.substring(3))];
  if (people < 1) {
    next({ status: 400, message: "The people field must be greater than 0." });
  } else if (typeof people !== 'number') {
    next({ status: 400, message: "The people field must be a number." });
  } else if (formattedDate.getTime() !== formattedDate.getTime()) {
    next({
      status: 400,
      message: "The reservation_date must be in the correct date format.",
    });
  } else if (formattedTime[0] !== "number" || formattedTime[1] !== ":" || formattedTime[2] !== "number") {
    next({
      status: 400,
      message: "The reservation_time must be in the correct time format.",
    });
  } else {
    next();
  }
}

// Takes body of request, if request scheduled for a Tuesday, then an error is returned
function notTuesday(req, res, next) {
  const { reservation_date } = req.body;
  const date = new Date(reservation_date);
  if (date.getDay() === 1) {
    next({ status: 400, message: "Restaurant is closed on Tuesdays." });
  } else {
    next();
  }
}

// If reservation is scheduled on a date before today's date, then an error is returned
function currentOrFutureDate(req, res, next) {
  const { reservation_date } = req.body;
  const reservationDate = new Date(reservation_date);
  const todaysDate = new Date();
  //console.log('reservation date', reservationDate, 'todaysDate', todaysDate);
  if (reservationDate < todaysDate) {
    next({
      status: 400,
      message: "Reservations may only be made on future dates.",
    });
  } else {
    next();
  }
}

// If reservation is scheduled outside of plausible serving hours, then an error is returned
function eligibleTimeframe(req, res, next) {
  const { reservation_time } = req.body;
  const lateCutoff = "21:30";
  const earlyCutoff = "10:30";
  if (reservation_time > lateCutoff || reservation_time < earlyCutoff) {
    next({
      status: 400,
      message: "Reservations must be made between 10:30 AM and 9:30 PM.",
    });
  } else {
    next();
  }
}

async function statusIsBooked(req, res, next) {
  const { status } = req.body;
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (status === "seated" && reservation.status !== "booked") {
    next({
      status: 400,
      message:
        "Reservation status must be 'booked' in order to seat a reservation",
    });
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
  for (let key in query) {
    if (key === "mobile_phone") {
      updatedQuery = {
        mobile_number: query[key],
      };
    } else if (key === "date") {
      updatedQuery = {
        reservation_date: query[key],
      };
    } else {
      next({
        status: 400,
        message: `Query key: ${key} does not match your conditionals.`,
      });
    }
  }
  res.status(200).json({
    data: await service.list(updatedQuery),
  });
}

async function create(req, res) {
  const reservation = req.body.data;
  res.status(201).json({
    data: await service.create(reservation),
  });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body;
  res.json({
    data: await service.updateStatus(reservation_id, status),
  });
}

async function read(req, res, next) {
  const { reservation_id } = req.params;
  res.json({
    data: await service.read(reservation_id),
  });
}

async function editReservation(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = req.body;
  console.log("reservation", reservation);
  res.json({
    data: await service.updateReservation(reservation_id, reservation),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    fieldsExist,
    correctFormat,
    currentOrFutureDate,
    notTuesday,
    eligibleTimeframe,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(statusIsBooked),
    asyncErrorBoundary(updateStatus),
  ],
  read: asyncErrorBoundary(read),
  editReservation: [
    fieldsExist,
    correctFormat,
    currentOrFutureDate,
    notTuesday,
    eligibleTimeframe,
    asyncErrorBoundary(editReservation),
  ],
};
