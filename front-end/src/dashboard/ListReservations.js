import React from "react";

function ListReservations({ reservations }) {
  const handleCancel = () => {};
  reservations.sort(function (a, b) {
    if (a.reservation_time < b.reservation_time) {
      return -1;
    } else if (a.reservation_time > b.reservation_time) {
      return 1;
    } else {
      return 0;
    }
  });
  /*function handleUpdate(reservation_id) {
    updateStatus(reservation_id)
    .catch((error));
  }*/
  const reservationsList =  reservations
    .map((reservation) => {
      let seatButton = null;
      if(reservation.status === "booked"){
        seatButton = <a className="btn btn-secondary btn-outline-light" href={`reservations/${reservation.reservation_id}/seat`} >
        Seat
      </a>
      }
      return (
        <div className="card" key={reservation.reservation_id} style={{width: "30rem", marginBottom: "10px"}}>
          <div
            className="card-header"
            id={"heading" + reservation.reservation_id.toString()}
            
          >
            <h5 className="card-title">
              <strong>Reservation #{reservation.reservation_id}: {reservation.last_name}, {reservation.first_name} at {reservation.reservation_time}</strong>
            </h5>
          </div>
          <div className="card-body" >
              <p>Party: {reservation.people}</p>
              <p>Telephone: {"("+reservation.mobile_number.substring(0,3)+") "+reservation.mobile_number.substring(3,6)+"-"+reservation.mobile_number.substring(6,10)}</p>
              <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
              <div className="btn-group" role="group" aria-label="reservations-buttons">
                {seatButton}
                <a className="btn btn-secondary btn-outline-light" href={`reservations/${reservation.reservation_id}/edit`}>
                  Edit
                </a>
                <button type="button" className="btn btn-secondary btn-outline-light" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
          </div>
        </div>
      );
    });
    return reservationsList;
}

export default ListReservations;
