import axios from "axios";

const BASE_URL = "https://sandbox-api.onsched.com";

export const getLocations = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/consumer/v1/locations`, {
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

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  try {
    const response = await axios.get(
      `${BASE_URL}/consumer/v1/locations/${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ location: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

// consuming app would have a locationId
// get registered services at a location
// consuming app could then show workflow some filtering workflow based on service option
// user selects some service DirectBookingBeauty
export const getServicesAtLocation = async (req, res) => {
  const { locationId } = req.query;

  try {
    const response = await axios.get(
      `${BASE_URL}/consumer/v1/services/?locationId=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ location: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

// Consuming App looks at availability for some predefined range initially
// all it needs to do is pass in the associated service id
// get availability for serviceId in a specific range
export const getAvailableTimes = async (req, res) => {
  const { serviceId, startDate, endDate } = req.params;
  const { locationId } = req.query;
  try {
    const response = await axios.get(
      `${BASE_URL}/consumer/v1/availability/${serviceId}/${startDate}/${endDate}?locationId=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ availability: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

export const createCustomer = async (req, res) => {
  const { firstName, lastName, email, type } = req.body;
  try {
    const response = await axios.post(
      `${BASE_URL}/consumer/v1/customers`,
      { lastname: lastName, firstname: firstName, email, type },
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
        },
      },
    );
    res.json({ customer: response.data });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

// if booking an appointment with a business level resource and serviceId, location is required!!!
export const initiateAppointment = async (req, res) => {
  // https://sandbox-api.onsched.com/consumer/v1/appointments
  const {
    serviceId,
    resourceId,
    startDateTime,
    endDateTime,
    locationId,
  } = req.body;
  console.log(req.session.accessToken);
  try {
    const response = await axios.post(
      `${BASE_URL}/consumer/v1/appointments`,
      { serviceId, resourceId, startDateTime, endDateTime, locationId },
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
          Accept: "text/plain",
          "Content-Type": "application/*+json",
        },
      },
    );
    res.json({ appointment: response.data });
  } catch (error) {
    // console.log("error", error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const response = await axios.delete(
      `${BASE_URL}/consumer/v1/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
          Accept: "text/plain",
          "Content-Type": "application/*+json",
        },
      },
    );
    res.json({ appointment: response.data });
  } catch (error) {
    // console.log("error", error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

// need to ensure that email exists in the body
export const bookAppointment = async (req, res) => {
  const { body } = req;
  const { appointmentId } = req.params;
  try {
    const response = await axios.put(
      `${BASE_URL}/consumer/v1/appointments/${appointmentId}/book`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
          Accept: "text/plain",
          "Content-Type": "application/*+json",
        },
      },
    );
    res.json({ appointment: response.data });
  } catch (error) {
    // console.log("error", error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};

export const getAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const response = await axios.get(
      `${BASE_URL}/consumer/v1/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken.access_token}`,
          Accept: "text/plain",
          "Content-Type": "application/*+json",
        },
      },
    );
    res.json({ appointment: response.data });
  } catch (error) {
    // console.log("error", error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.sendStatus(500);
  }
};
