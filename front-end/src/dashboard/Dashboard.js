import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

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
    return (
      <ul key={reservation.reservation_id}>
        <li>First Name: {reservation.first_name}</li>
        <li>Last Name: {reservation.last_name}</li>
        <li>Number of People in Party: {reservation.people}</li>
        <li>Time: {reservation.reservation_time}</li>
        <li>
          <a href={`reservations/${reservation.reservation_id}/seat`}>Seat</a>
        </li>
      </ul>
    );
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
      <section>
        <div>
          {reservations.length ? (
            displayReservations
          ) : (
            <>No reservations are scheduled for this date.</>
          )}
          <div>
            <button
              type="button"
              onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
            >
              Previous
            </button>
            <button type="button" onClick={() => history.push("/dashboard")}>
              Today
            </button>
            <button
              type="button"
              onClick={() => history.push(`/dashboard?date=${next(date)}`)}
            >
              Next
            </button>
          </div>
        </div>
        <div>Tables sorted by table_name will go here and display "Free" or "Occupied"( with attribute: data-table-id-status=table.table_id).</div>
      </section>
    </main>
  );
}

export default Dashboard;
