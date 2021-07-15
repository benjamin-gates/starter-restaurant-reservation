const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Helper functions for /tables route
 */
async function tableOccupied(req, res, next){
    const {table_id} = req.body;
    const table = await service.read(table_id);
    if(table.reservation_id){
        next({status: 400, message: `${table.table_name} is currently occupied.`})
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

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    update: [asyncErrorBoundary(tableOccupied), asyncErrorBoundary(update)],
}