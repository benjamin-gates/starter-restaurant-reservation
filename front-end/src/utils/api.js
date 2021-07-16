/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the request.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * 
 * @param reservation 
 * The request body of the new reservation
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the newly created reservation
 */
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/new`);
  return await fetchJson(url, {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal
  });
}

export async function updateStatus(reservation_id, statusUpdate) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);
  return await fetchJson(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(statusUpdate)
  });
}

/**
 * 
 * @returns 
 *  a promise that resolves to a possible empty array of tables saved to the database
 */
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, {headers, signal}, []);
}

/**
 * 
 * @param table
 * The request body of the new table
 * @returns {Promise<[table]>}
 *  a promise that resolves to the newly created table
 */
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables/new`);
  return await fetchJson(url, {
    method: "POST",
    headers,
    body: JSON.stringify(table),
    signal
  });
}

/**
 * 
 * @param seatingAssignment 
 * The request body that includes the reservation_id and table_id
 * @returns 
 * a promise that resolves to the body of the updated table
 */
export async function seatReservation(table_id, seatingAssignment){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat/`);
  return await fetchJson(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(seatingAssignment),
  });
}

/**
 * 
 * @param table_id 
 * The id of the table id that is being requested to finish
 * @returns 
 * A status of 204 upon successful deletion of reservation id
 */
export async function deleteReservation(table_id){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat/`);
  return await fetchJson(url, {
    method: "DELETE",
    headers,
  });
}
