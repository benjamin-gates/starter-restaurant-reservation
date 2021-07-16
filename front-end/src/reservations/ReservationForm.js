import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function ReservationForm({handleSubmit, formData, setFormData}){
    const history = useHistory();
    //const [formData, setFormData] = useState(initialState);
    console.log('form data', formData);
    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
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
        </div>
        <div className="container-fluid">
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
        </div>
        <div className="container-fluid">
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
        </div>
        <div className="container-fluid">
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
        </div>
        <div className="container-fluid">
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
        </div>
        <div className="container-fluid">
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
        <div className="btn-group" role="group" aria-label="new-reservation-group">
        <button type="button" className="btn btn-dark btn-outline-light" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit" className="btn btn-dark btn-outline-light">Submit</button>
        </div>
        </div>
      </form>
      )
}

export default ReservationForm;