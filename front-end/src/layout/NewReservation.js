import React, {useEffect, useState} from "react";

function NewReservation() {
    return <form>
        <label htmlFor = "first_name">
            First Name:
            <input type="text" name="first_name" id="first_name" />
        </label>
        <label htmlFor="last_name">
            Last Name:
            <input type="text" name="last_name" id="last_name" />
        </label>
        <label htmlFor="mobile_number">
            Mobile Phone Number:
            <input type="tel" name="mobile_number" id="mobile_number" />
        </label>
        <label htmlFor="reservation_date">
            Reservation Date:
            <input type="date" name="reservation_date" id="reservation_date" />
        </label>
        <label htmlFor="reservation_time">
            Reservation Time:
            <input type="time" name="reservation_time" id="reservation_time" />
        </label>
        <button type="button">Cancel</button>
        <button type="submit">Submit</button>
    </form>
}

export default NewReservation;