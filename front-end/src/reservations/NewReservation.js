import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();

  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    createReservation(formData)
    .then(() => setFormData(initialState))
    .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
    .catch(setSubmissionError)
  };

  return (
    <main>
      <h1>Create Reservation</h1>
      <ReservationForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
      <ErrorAlert error={submissionError} />
    </main>
  );
}

export default NewReservation;
