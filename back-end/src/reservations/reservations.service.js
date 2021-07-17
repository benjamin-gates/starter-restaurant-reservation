const knex = require("../db/connection");

function list(query){
    return knex("reservations").select("*").where(query);
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

function updateReservation(reservation_id, reservation){
    return knex("reservations").where({reservation_id: reservation_id}).update({...reservation});
}



module.exports = {
    list,
    create,
    read,
    updateStatus,
    updateReservation,
}