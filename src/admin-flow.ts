import axios from "axios";
import * as qs from "qs";

const BASE_URL = "https://sandbox-api.onsched.com/setup/v1/";

export const getAppointmentsAdmin = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/appointments?${qs.stringify(req.query)}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ appointments: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

export const getCalendarsAdmin = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/calendars?${qs.stringify(req.query)}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ calendars: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

export const getLocationsAdmin = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/locations`, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken.access_token}`,
      },
    });
    res.json({ location: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};
