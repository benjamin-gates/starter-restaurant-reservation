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

function readTable(tableId){
    return knex("tables").where({table_id: tableId}).first();
}

function readReservation(reservationId){
    return knex("reservations").where({reservation_id: reservationId}).first();
}

function destroyReservation(tableId){
    return knex("tables").where({table_id: tableId}).update({reservation_id: null});
}

module.exports = {
    list,
    create,
    update,
    readTable,
    readReservation,
    delete: destroyReservation
}