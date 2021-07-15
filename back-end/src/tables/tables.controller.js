const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Helper functions for /tables route
 */

// Returns an error if the table is already occupied by a reservation
async function tableOccupied(req, res, next){
    const {table_id} = req.body;
    const table = await service.readTable(table_id);
    if(table.reservation_id){
        next({status: 400, message: `${table.table_name} is currently occupied.`})
    } else {
        res.locals.table = table;
        next();
    }
}

// Returns an error if the number of people in the reservation is greater than the table's capacity
async function enoughSeats(req, res, next){
    const {reservation_id} = req.body;
    const table = res.locals.table;
    const reservation = await service.readReservation(reservation_id);
    //console.log('enough room at the table?', table.capacity >= reservation.people);
    if(reservation.people > table.capacity){
        next({status: 400, message: `${table.table_name} does not have enough seats to occupy reservation ${reservation_id}`});
    } else {
        next();
    }

}

// Returns an error if the table is not already occupied by a reservation
async function tableNotOccupied(req, res, next){
    const {table_id} = req.body;
    const table = await service.readTable(table_id);
    if(!table.reservation_id){
        next({status: 400, message: `${table.table_name} is not currently occupied.`})
    } else {
        next();
    }
}


/**
 * Handler functions for /tables route
 */

async function list(req, res, next) {
    res.json({data: await service.list()})
}

async function create(req, res, next){
    const table = req.body;
    res.json({data: await service.create(table)});
}

async function update(req, res, next){
    const {table_id, reservation_id} = req.body;
    res.json({data: await service.update(table_id, reservation_id)});
}

async function destroyReservation(req, res, next){
    const {table_id} = req.body;
    await service.delete(table_id);
    res.sendStatus(204);
}     

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    update: [ asyncErrorBoundary(tableOccupied), asyncErrorBoundary(enoughSeats), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(tableNotOccupied), asyncErrorBoundary(destroyReservation)]

}