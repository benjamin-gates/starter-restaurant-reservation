const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res, next){
    const table = req.body;
    res.json({data: await service.create(table)});
}

module.exports = {
    create: asyncErrorBoundary(create),
}