import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function EditReservation() {
  const history = useHistory();
  const {reservation_id} = useParams();

  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(initialState);
    history.push("/dashboard");
  };

  return (
    <main>
      <h1>Edit Reservation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            name="first_name"
            id="first_name"
            required="required"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            name="last_name"
            id="last_name"
            required="required"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="mobile_number">
          Mobile Phone Number:
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            required="required"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="reservation_date">
          Reservation Date:
          <input
            type="date"
            name="reservation_date"
            id="reservation_date"
            required="required"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="reservation_time">
          Reservation Time:
          <input
            type="time"
            name="reservation_time"
            id="reservation_time"
            required="required"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="people">
          Number of People in Party:
          <input
            type="number"
            name="people"
            id="people"
            min="1"
            required="required"
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default EditReservation;
