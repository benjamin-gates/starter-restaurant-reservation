import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import EditReservation from "../reservations/EditReservation";
import Search from "../search/Search";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  let query = useQuery();
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route exact = {true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      
      <Route path="/reservations">
        <Dashboard date={query.get("date")? query.get("date") : today()} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={query.get("date")? query.get("date") : today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
