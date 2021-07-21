import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {readReservation, updateReservation, listReservations} from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";

function EditReservation({setReservations, setEditedReservation}) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    setEditedReservation(await updateReservation(reservation_id, formData));
    //console.log('form data date', formData.reservation_date, 'date type', typeof formData.reservation_date);
    setReservations(await listReservations({date: formData.reservation_date}));
    //await listReservations(formData.reservation_date);
    history.goBack();
    } catch (error) {
      setReservationError(error);
    }
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
