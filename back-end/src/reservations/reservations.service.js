const knex = require("../db/connection");

function list(date){
    return knex("reservations").select("*");
}

module.exports = {
    list,
}