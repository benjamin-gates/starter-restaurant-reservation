import React, { useState, useEffect } from "react";
import useQuery from "../utils/useQuery";

function Search() {
  const [foundReservations, setFoundReservations] = useState(null);
  const mobile_number = useQuery().get("mobile_number");
  const handleFind = (event) => {
    //event.preventDefault();
    //setFoundReservations("No reservations found");
  };

  useEffect(() => {
    if (!mobile_number) {
      setFoundReservations(null);
    } else {
      setFoundReservations(
        `No reservations found for number: ${mobile_number}`
      );
    }
    //return setFoundReservations(null);
  }, [mobile_number]);

  return (
    <main>
      <h1>Search</h1>
      <form onSubmit={handleFind}>
        <div className="container-fluid">
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
        </div>
      </form>
      {foundReservations}
    </main>
  );
}

export default Search;
