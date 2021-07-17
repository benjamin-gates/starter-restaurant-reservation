import React, { useState } from "react";
import { updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ListReservations({ reservations, searchPage=false }) {
  const [cancelError, setCancelError] = useState(null);
  const handleCancel = (event) => {
    event.preventDefault();
    if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
      updateStatus(event.target.value, {status: "cancelled"})
      .then(() => window.location.reload())
      .catch(setCancelError);
    }
  };
  //const [seatError, setSeatError] = useState(null);
  //const [reservationId, setReservationId] = useState(null);
  /*const handleSeat = (event) => {
    //event.preventDefault()
    console.log('reservationId', reservationId);
    updateStatus(reservationId, { status: "seated" }).catch(setSeatError);
  };*/
  let filteredReservations = reservations;
  if(!searchPage){
  filteredReservations = reservations.filter((reservation) => reservation.status !== "finished" && reservation.status !== "cancelled");
  }
  filteredReservations.sort(function (a, b) {
    if (a.reservation_time < b.reservation_time) {
      return -1;
    } else if (a.reservation_time > b.reservation_time) {
      return 1;
    } else {
      return 0;
    }
  });

  const reservationsList = filteredReservations.map((reservation) => {
    let seatAndEditButtons = null;
    let dateElement = null;
    if (reservation.status === "booked") {
      seatAndEditButtons = (
        <>
        <a
          className="btn btn-secondary btn-outline-light"
          href={`reservations/${reservation.reservation_id}/seat`}
          onClick={() => updateStatus(reservation.reservation_id, {status: "seated"})}
        >
          Seat
        </a>
        <a
        className="btn btn-secondary btn-outline-light"
        href={`reservations/${reservation.reservation_id}/edit`}
      >
        Edit
      </a>
      </>
      );
    }

    if(searchPage){
      dateElement = <p>Date: {reservation.reservation_date}</p>
    }
    //console.log('seating error', seatError);
    return (
      <div
        className="card"
        key={reservation.reservation_id}
        style={{ width: "30rem", marginBottom: "10px" }}
      >
        <div
          className="card-header"
          id={"heading" + reservation.reservation_id.toString()}
        >
          <h5 className="card-title">
            <strong>
              Reservation #{reservation.reservation_id}: {reservation.last_name}
              , {reservation.first_name} at {reservation.reservation_time}
            </strong>
          </h5>
        </div>
        <div className="card-body">
          <p>Party: {reservation.people}</p>
          <p>
            Telephone:{" "}
            {"(" +
              reservation.mobile_number.substring(0, 3) +
              ") " +
              reservation.mobile_number.substring(3, 6) +
              "-" +
              reservation.mobile_number.substring(6, 10)}
          </p>
          <p data-reservation-id-status={reservation.reservation_id}>
            Status: {reservation.status}
          </p>
          {dateElement}
          <div
            className="btn-group"
            role="group"
            aria-label="reservations-buttons"
          >
            {seatAndEditButtons}
            
            <button
              type="button"
              className="btn btn-secondary btn-outline-light"
              data-reservation-id-cancel={reservation.reservation_id}
              value={reservation.reservation_id}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <ErrorAlert error={cancelError} />
        </div>
      </div>
    );
  });
  return reservationsList;
}

export default ListReservations;
