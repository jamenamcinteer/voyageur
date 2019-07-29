import axios from "axios";

export const addTrip = trip => ({
  type: "ADD_TRIP",
  trip
});

export const startAddTrip = trip => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/trips", trip);
      let trips = JSON.parse(localStorage.getItem("trips"));
      trips.push(res.data);
      localStorage.setItem("trips", JSON.stringify(trips));
      dispatch(addTrip(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const removeTrip = ({ id } = {}) => ({
  type: "REMOVE_TRIP",
  id
});

export const startRemoveTrip = ({ id } = {}) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/trips/${id}`);
      localStorage.setItem("trips", JSON.stringify(res.data));
      dispatch(removeTrip(id));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      localStorage.setItem("isOffline", "true");
      return error;
    }
  };
};

export const editTrip = (id, updates) => ({
  type: "EDIT_TRIP",
  id,
  updates
});

export const startEditTrip = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/trips/${id}`, updates);
      localStorage.setItem("trips", JSON.stringify(res.data));
      dispatch(editTrip(id, updates));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const setTrips = trips => ({
  type: "SET_TRIPS",
  trips
});

export const startSetTrips = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/trips");
      localStorage.setItem("trips", JSON.stringify(res.data));
      dispatch(setTrips(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("trips"));
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      if (res) {
        dispatch(setTrips(res));
      } else {
        return error;
      }
    }
  };
};
