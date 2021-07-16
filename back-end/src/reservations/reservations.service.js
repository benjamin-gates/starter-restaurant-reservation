const knex = require("../db/connection");

function list(date){
    return knex("reservations").select("*").where({reservation_date: date});
}

function create(reservation){
    return knex("reservations").insert(reservation).returning("*").then((createdRecords) => createdRecords[0]);
}

function read(reservationId){
    return knex("reservations").where({reservation_id: reservationId}).first();
}

function updateStatus(reservationId, newStatus){
    return knex("reservations").where({reservation_id: reservationId}).update({status: newStatus});
}


module.exports = {
    list,
    create,
    read,
    updateStatus,
}