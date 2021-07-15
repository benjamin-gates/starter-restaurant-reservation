const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list(){
    return knex("tables").select("*");
}

function create(table){
    return knex("tables").insert(table).returning("*").then((createdRecords) => createdRecords[0]);
}

function update(tableId, reservationId){
    return knex("tables").where({table_id: tableId}).update({reservation_id: reservationId});
}

function read(tableId){
    return knex("tables").where({table_id: tableId}).first();
}

module.exports = {
    list,
    create,
    update,
    read
}