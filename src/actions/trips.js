import axios from "axios";

export const addTrip = trip => ({
  type: "ADD_TRIP",
  trip
});

export const startAddTrip = trip => {
  return async dispatch => {
    const res = await axios.post("/api/trips", trip);
    dispatch(addTrip(res.data));
  };
};

export const removeTrip = ({ id } = {}) => ({
  type: "REMOVE_TRIP",
  id
});

export const startRemoveTrip = ({ id } = {}) => {
  return async dispatch => {
    await axios.delete(`/api/trips/${id}`);
    dispatch(removeTrip(id));
  };
};

export const editTrip = (id, updates) => ({
  type: "EDIT_TRIP",
  id,
  updates
});

export const startEditTrip = (id, updates) => {
  return async dispatch => {
    await axios.put(`/api/trips/${id}`, updates);
    dispatch(editTrip(id, updates));
  };
};

export const setTrips = trips => ({
  type: "SET_TRIPS",
  trips
});

export const startSetTrips = () => {
  return async dispatch => {
    const res = await axios.get("/api/trips");
    dispatch(setTrips(res.data));
  };
};
