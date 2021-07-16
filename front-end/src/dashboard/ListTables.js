import React, {useState} from "react";
//import {useHistory} from "react-router-dom";
import {deleteReservation, updateStatus} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ListTables({ tables }) {
  //const history = useHistory();
  const [deleteError, setDeleteError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  let status = null;
  let backgroundColor = null;
  /*const handleFinish = (event) => {
    event.preventDefault();
    if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
      /*updateStatus(event.target.value.reservation_id, {status: "finished"})
      .catch(setUpdateError);
      deleteReservation(event.target.value.table_id)
       .then(() => document.location.reload())
       .catch(setDeleteError);
    }
  }*/
  return tables.map((table) => {
    if (table.reservation_id) {
      backgroundColor = "lightred";
      status = (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div data-table-id-status={table.table_id} style={{ color: "red" }}>
            <strong>Occupied </strong>
          </div>
          <button data-table-id-finish={table.table_id} type="button" className="btn btn-secondary btn-outline-light" value={table.table_id} onClick={(event) => {
            event.preventDefault();
            updateStatus(table.reservation_id, {status: "finished"})
            .catch(setUpdateError);
            deleteReservation(table.table_id)
            .then(() => document.location.reload())
            .catch(setUpdateError);
          }}>
            Finish
          </button>
          <ErrorAlert error={deleteError} />
          <ErrorAlert error={updateError} />
        </div>
      );
    } else {
      backgroundColor = "#C0E9C6";
      status = (
        <div data-table-id-status={table.table_id} style={{ color: "green" }}>
          <strong>Free</strong>
        </div>
      );
    }
    return (
      <li
        key={table.table_id}
        className="list-group-item"
        style={{ backgroundColor: backgroundColor }}
      >
        {status}
        <div>
          Table: {table.table_name} | Capacity: {table.capacity}
        </div>
      </li>
    );
  });
}

export default ListTables;
