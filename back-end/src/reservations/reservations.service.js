const knex = require("../db/connection");

function listForMobile(){
    return knex("reservations").select("*").orderBy("reservation_time");
}

function listForDate(date){
    return knex("reservations").select("*").where("reservation_date", date).whereNot("status", "finished").orderBy("reservation_time");
}

function create(reservation){
    return knex("reservations").insert(reservation).returning("*").then((createdRecords) => createdRecords[0]);
}

function read(reservationId){
    return knex("reservations").where({reservation_id: reservationId}).first();
}

function updateStatus(reservationId, newStatus){
    return knex("reservations").select("status").where({reservation_id: reservationId}).update({status: newStatus}).returning("*").then((createdRecords) => createdRecords[0]);
}

function updateReservation(reservation_id, reservation){
    return knex("reservations").where({reservation_id: reservation_id}).update({...reservation}).returning("*").then((createdRecords) => createdRecords[0]);
}


module.exports = {
    listForMobile,
    listForDate,
    create,
    read,
    updateStatus,
    updateReservation,
}