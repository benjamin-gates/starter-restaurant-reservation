const knex = require("../db/connection");

function list(){
    return knex("tables").select("*").orderBy("table_name");
}

function create(table){
    return knex("tables").insert(table).returning("*").then((createdRecords) => createdRecords[0]);
}


function update(tableId, reservationId){
    return knex.transaction(async function(trx){
        await trx.select("*").from("tables").where("table_id", tableId).update("reservation_id", reservationId);
        await trx.select("*").from("reservations").where("reservation_id", reservationId).update("status", "seated");
    });
}

function readTable(tableId){
    return knex("tables").where({table_id: tableId}).first();
}

function readReservation(reservationId){
    return knex("reservations").where({reservation_id: reservationId}).first();
}

/*function destroyReservation(tableId){
    return knex("tables").where({table_id: tableId}).update({reservation_id: null});
}*/

function destroyReservation(tableId, reservationId){
    return knex.transaction(async function(trx){
        await trx.select("*").from("tables").where("table_id", tableId).update("reservation_id", null);
        await trx.select("*").from("reservations").where("reservation_id", reservationId).update("status", "finished");
    });
}

module.exports = {
    list,
    create,
    update,
    readTable,
    readReservation,
    delete: destroyReservation
}