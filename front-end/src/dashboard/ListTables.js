import React from "react";

function ListTables({ tables }) {
  let status = null;
  let backgroundColor = null;
  return tables.map((table) => {
    if (table.reservation_id) {
      backgroundColor = "lightred";
      status = (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div data-table-id-status={table.table_id} style={{ color: "red" }}>
            <strong>Occupied </strong>
          </div>
          <button type="button" className="btn btn-secondary btn-outline-light">
            Finish
          </button>
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
