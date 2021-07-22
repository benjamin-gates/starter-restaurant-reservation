import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";

function EditReservation() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    await updateReservation(reservation_id, formData);
    history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
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
