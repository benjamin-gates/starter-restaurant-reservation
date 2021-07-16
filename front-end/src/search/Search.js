import React, { useState, useEffect } from "react";
import useQuery from "../utils/useQuery";
import { search } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../dashboard/ListReservations";

function Search() {
  const [foundReservations, setFoundReservations] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const mobile_number = useQuery().get("mobile_number");

  useEffect(() => {
    if (!mobile_number) {
      setFoundReservations(null);
    } else {
      search(mobile_number)
        .then((reservations) => {
          if (reservations.length) {
            setFoundReservations(reservations);
          } else {
            setFoundReservations(`No reservations found`);
          }
        })
        .catch(setSearchError);
    }
    //return setFoundReservations(null);
  }, [mobile_number]);
  let reservationsElement = null;
  if (typeof foundReservations === Array) {
    reservationsElement = (
      <ListReservations reservations={foundReservations} searchPage="true" />
    );
  } else {
    reservationsElement = <p>{foundReservations}</p>;
  }

  return (
    <main>
      <h1>Search</h1>
      <div className="container-fluid">
        <form onSubmit={handleFind}>
          <label htmlFor="mobile_number">
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              placeholder="Enter a customer's phone number"
            />
          </label>
          <button className="btn btn-dark btn-outline-light" type="submit">
            Find
          </button>
        </form>
        {reservationsElement}
        <ErrorAlert error={searchError} />
      </div>
    </main>
  );
}

export default Search;
