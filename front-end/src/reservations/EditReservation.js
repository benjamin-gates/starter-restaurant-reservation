import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {readReservation} from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";

function EditReservation() {
  const history = useHistory();
  const {reservation_id} = useParams();
  console.log('reservation id', reservation_id);
  const [reservationError, setReservationError] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    console.log('before set reservation error');
    setReservationError(null);
    console.log('after set reservation error');
    readReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setReservationError);
    return () => abortController.abort();
  }
  /*const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
  };*/

  /*const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    //setFormData(initialState);
    history.push("/dashboard");
  };
  console.log('form data', formData);
  return (
    formData ? (
    <main>
      <h1>Edit Reservation</h1>
      <ReservationForm handleSubmit={handleSubmit} formData={formatReservationDate(formData)} setFormData={setFormData} />
      <ErrorAlert error={reservationError} />
    </main>
    ) : (
      <p>Loading...</p> 
    )
  );
}

export default EditReservation;
