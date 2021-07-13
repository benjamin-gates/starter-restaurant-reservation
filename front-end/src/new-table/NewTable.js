import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const [createError, setCreateError] = useState(null);

  const initialState = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialState);

  const history = useHistory();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
      event.preventDefault();
      createTable(formData)
      .then(() => setFormData(initialState))
      .then(() => history.push("/dashboard"))
      .catch(setCreateError);
  };

  return (
    <main>
      <h1>Create Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid">
          <label htmlFor="table_name">
            Table Name:
            <input
              type="text"
              name="table_name"
              id="table_name"
              minLength="2"
              required="required"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="container-fluid">
          <label htmlFor="capacity">
            Capacity:
            <input
              name="capacity"
              id="capacity"
              type="number"
              min="1"
              required="required"
              onChange={handleChange}
            />
          </label>
        </div>
        <div
          className="btn btn-group"
          role="group"
          aria-label="new-table-group"
        >
          <button
            type="button"
            className="btn btn-dark btn-outline-light"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-dark btn-outline-light">
            Submit
          </button>
        </div>
      </form>
      <ErrorAlert error={createError} />
    </main>
  );
}

export default NewTable;
