import React from "react";
import { useParams, useHistory } from "react-router-dom";

function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  return (
    <section>
      <h2>Seat Reservation #{reservation_id}:</h2>
      <form onSubmit={() => history.push("/dashboard")}>
        <select class="form-select" name="table_id">
          <option selected>View Available Tables</option>
          <option value="1">table.table_name - table.capacity (1)</option>
          <option value="2">table.table_name - table.capacity (2)</option>
        </select>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default SeatReservation;
