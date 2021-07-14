import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, [reservation_id]);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const tablesOptions = tables.map((table) => {
    return <option value={table.table_id}>{table.table_name} - {table.capacity}</option>;
  });

  return (
    <main>
      <h1>Seat Reservation #{reservation_id}:</h1>{
        tables.length ? (
      <form onSubmit={() => history.push("/dashboard")}>
        <select class="form-select" name="table_id">
          <option selected>View Available Tables</option>
          {tablesOptions}
        </select>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
        ) : (
          <ErrorAlert error={tablesError} />
        )
}
    </main>
  );
}

export default SeatReservation;
