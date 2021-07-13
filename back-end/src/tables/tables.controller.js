const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next) {
    res.json({data: await service.list()})
}

async function create(req, res, next){
    const table = req.body;
    res.json({data: await service.create(table)});
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
}