import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
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
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleCancel = () => {};

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
        <li>
          <a href={`reservations/${reservation.reservation_id}/edit`}>Edit</a>
        </li>
        <li>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </li>
      </ul>
    );
  });

  const tablesDisplay = tables.map((table) => {
    return <ul key={table.table_id}>
      <li>Table Name: {table.table_name}</li>
      <li>Capacity: {table.capacity}</li>
    </ul>
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="container-fluid"> {/*d-md-flex mb-3*/}
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/*{JSON.stringify(reservations)}*/}
      <section className="container-fluid">
        <div>
          {reservations.length ? (
            displayReservations
          ) : (
            <div>No reservations are scheduled for this date.</div>
          )}
          <div className="btn-group" role="group" aria-label="dashboard-group">
            <button
              type="button"
              className="btn btn-dark btn-outline-light"
              onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              Previous
            </button>
            <button
              type="button"
              className="btn btn-dark btn-outline-light"
              onClick={() => history.push("/dashboard")}
            >
              Today
            </button>
            <button
              type="button"
              className="btn btn-dark btn-outline-light"
              onClick={() => history.push(`/dashboard?date=${next(date)}`)}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          {tablesDisplay.length ? tablesDisplay : (
          <ErrorAlert error={tablesError} />
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
