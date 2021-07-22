import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatReservation, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [seatingError, setSeatingError] = useState(null);

  const [tableId, setTableId] = useState(null);

  useEffect(loadTables, [reservation_id]);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const tablesOptions = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });
  const handleChange = (event) => {
    setTableId(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    seatReservation(tableId, { reservation_id: reservation_id })
      .then(() => setTableId(null))
      .then(() => history.push("/dashboard"))
      .catch(setSeatingError);
  };
  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <main>
      <h1>Seat Reservation {reservation_id}:</h1>
      {tables.length ? (
        <section>
          <form onSubmit={handleSubmit}>
            <div className="container-fluid">
              <select
                className="form-select"
                name="table_id"
                onChange={handleChange}
              >
                <option defaultValue>View All Tables</option>
                {tablesOptions}
              </select>
              <div
                className="btn btn-group"
                role="group"
                aria-label="seat-reservation-group"
              >
                <button
                  type="button"
                  className="btn btn-dark btn-outline-light"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-dark btn-outline-light"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <ErrorAlert error={seatingError} />
        </section>
      ) : (
        <ErrorAlert error={tablesError} />
      )}
    </main>
  );
}

export default SeatReservation;
