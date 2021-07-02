import React, {useState, useEffect} from "react";
import useQuery from "../utils/useQuery";

function Search() {
    const [foundReservations, setFoundReservations] = useState(null);
    const mobile_number = useQuery().get("mobile_number");
    const handleFind = (event) => {
        console.log("hello!")
        //event.preventDefault();
        //setFoundReservations("No reservations found");
    }
    useEffect(() => {
        if(!mobile_number){
            setFoundReservations(null)
        } else{
        setFoundReservations(`No reservations found for number: ${mobile_number}`);
        }
        //return setFoundReservations(null);
    }, [mobile_number]);


  return (
    <main>
      <h2>Search for Customer by Phone Number</h2>
      <form onSubmit={handleFind}>
        <label htmlFor="mobile_number">
          <input
            id="mobile_number"
            name="mobile_number"
            type="tel"
            placeholder="Enter a customer's phone number"
          />
        </label>
        <button type="submit">Find</button>
      </form>
      {foundReservations}
    </main>
  );
}

export default Search;
