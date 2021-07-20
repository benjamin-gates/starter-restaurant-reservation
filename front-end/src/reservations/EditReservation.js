import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";

function EditReservation() {
  //console.log('you made it to the edit reservation page.');
  const history = useHistory();
  const {reservation_id} = useParams();
  const [reservationError, setReservationError] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
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
    updateReservation(reservation_id, formData)
    //.then((update) => console.log('response from server', update))
    .then(() => history.goBack())
    .catch(setReservationError);
    //history.push("/dashboard");
  };

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
