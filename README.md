# Periodic Tables: Restaurant Reservation System
Link to deployed application: https://res-sys-client.herokuapp.com/dashboard

## Summary
The purpose of this application is to assist the user in creating, reading, updating, and deleting reservations. The main features of this applicaiton are:
- Dashboard
- Create Reservation
- Create Table
- Search
- Seat Reservation
### Dashboard
When the user first arrives at the site, they are directed to the dashboard page. Here, they are shown a list of all booked and seated reservations for today's date, and a list of all tables. The user can click "Previous" or "Next" to navigate to a different date, in which they will be shown the reservations for that given day. Booked reservations display a "Seat" and "Edit" button, and both booked and seated reservations have a "Cancel" button. Tables indicate whether they are free or occupied. If a table is occupied, then a "Finish" button is displayed. When "Finished" is clicked, the table becomes open and the corresponding reservation's status is set to finished.
![Dashboard Screenshot](/front-end/public/img/dashboard.png)
### Create Reservation
When creating a reservation, the user must fill in every field. If the user schedules a reservation on a date when the restaurant is open or outside plausible serving hours, then an error message is displayed. If the user successfully fills in every field, then they are redirected to the Dashboard page with the date set to the new reservation's date upon submission.
![Create Reservation Screenshot](/front-end/public/img/create-reservationpng.png)
### Create Table
The user is allowed to add additional tables, if they find that their restaurant needs more tables to handle their clientel. The table names must have at least 2 characters and a capacity of at least 1, or else an error is displayed. The user is redirected to the Dashboard page upon submission, and the new table is displayed. 
![Create Table Screenshot](/front-end/public/img/create-table.png)
### Search
The user can search for a reservation by phone number (suppose the customer called and the staff can see number on the phone). When the user clicks "Find" all reservations matching the given phone number, regardless of their status, are displayed with the same format as the dashboard page. The search only needs to be a partial match to see reservations.
![Search Screenshot](/front-end/public/img/search2.png)
### Seat Reservation
When the user clicks "Seat" on the dashboard page, then they are taken to the Seat Reservation page. Here, the use can select a table for the reservation. If the table is already occupied or doesn't have sufficient capacity, then an error is shown. When the use selects the correct table and hits submit, then they are redirected to the dashboard with the reservation status set to seated and the table displaying occupied.
![Seat Reservation Screenshot](/front-end/public/img/seat-reservation.png)
## Technology Used
- Frontend: JavaScript, React, CSS, Bootstrap
- Backend: JavaScript, Knex.js, Express, PostgreSQL, Node.js
## Installlation Instructions
To install this application on your computer:
1. Fork and clone this repository
1. Run `cp .env.sample .env`
1. Copy and paste your database URLs into the .env file
1. Run `npm install` from the command line
1. Run `npm knex migrate:latest`
1. Start the application with `npm run start` (runs backend and frontend applications concurrently)