import * as express from "express";
import axios from "axios";
import * as qs from "qs";
import * as session from "express-session";
import * as bodyParser from "body-parser";

import {
  getAppointment,
  getAvailableTimes,
  getLocationById,
  getLocations,
  getServicesAtLocation,
  initiateAppointment,
  deleteAppointment,
  createCustomer,
  bookAppointment,
} from "./booking-flow";

import {
  getAppointmentsAdmin,
  getCalendarsAdmin,
  getLocationsAdmin,
} from "./admin-flow";

const app = express();
const port = 8000;
interface AccessToken {
  expires_in: number;
  access_token: string;
  token_type: string;
}
declare module "express-session" {
  interface SessionData {
    accessToken?: AccessToken;
  }
}

const authenticateApiService = (): Promise<AccessToken> => {
  const tokenURL = "https://sandbox-identity.onsched.com/connect/token";

  const params = {
    client_id: "sbox1613466778",
    client_secret: process.env.CLIENT_SECRET,
    scope: "OnSchedApi",
    grant_type: "client_credentials",
    "content-type": "application/x-www-form-urlencoded",
  };
  return axios
    .post(tokenURL, qs.stringify(params))
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error("unable to authenticate");
    });
};

authenticateApiService()
  .then((accessToken) => {
    console.log("got an access token", accessToken);
    app.use(
      session({
        secret: "super secret",
      }),
    );
    app.use((req, res, next) => {
      if (!req.session.accessToken) {
        console.log("setting an accessToken");
        req.session.accessToken = accessToken;
      }
      next();
    });
    app.use(bodyParser.json());

    // BOOKING FLOW RELATED API CALLS
    app.get("/locations", getLocations);
    app.get("/locations/:locationId", getLocationById);
    app.get("/services", getServicesAtLocation);
    app.get("/availability/:serviceId/:startDate/:endDate", getAvailableTimes);
    app.post("/appointments", initiateAppointment);
    app.get("/appointments/:appointmentId", getAppointment);
    app.delete("/appointments/:appointmentId", deleteAppointment);
    app.put("/appointments/:appointmentId/book", bookAppointment);
    app.post("/customer", createCustomer);

    // SETUP AND INTROSPECTION CALLS
    app.get("/admin/appointments", getAppointmentsAdmin);
    app.get("/admin/calendars", getCalendarsAdmin);
    app.get("/admin/locations", getLocationsAdmin);
    app.listen(port, () =>
      console.log(`Typescript app listening on port ${port}!`),
    );
  })
  .catch((error) => {
    console.error("unable to authenticate api service");
  });
