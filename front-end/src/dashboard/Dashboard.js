import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  //if(reservations){
    const displayReservations = reservations.map((reservation) => {
      return <ul key={reservation.reservation_id}>
        <li>First Name: {reservation.first_name}</li>
        <li>Last Name: {reservation.last_name}</li>
        <li>Number of People in Party: {reservation.people}</li>
        <li>Time: {reservation.reservation_time}</li>
      </ul>
    });
 // }
//console.log("reservations", reservations);
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/*{JSON.stringify(reservations)}*/}
      {displayReservations}
    </main>
  );
}

export default Dashboard;
