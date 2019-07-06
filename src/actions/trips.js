export const startSetTrips = (state, dispatch) => {
  const trips = JSON.parse(localStorage.getItem("trips"));
  return dispatch({
    type: "FETCH_TRIPS",
    payload: trips
  });
};

export const startRemoveTrip = (id, state, dispatch) => {
  localStorage.setItem(
    "trips",
    JSON.stringify(state.trips.filter(i => i.id !== id))
  );

  return dispatch({
    type: "DELETE_TRIP",
    id
  });
};

export const startEditTrip = (id, updates, state, dispatch) => {
  let arr = state.trips.filter(i => i.id !== id);
  arr.push(updates);
  localStorage.setItem("trips", JSON.stringify(arr));

  return dispatch({
    type: "UPDATE_TRIP",
    id,
    updates
  });
};

export const startAddTrip = (data, state, dispatch) => {
  let arr = state.trips;
  arr.push(data);
  localStorage.setItem("trips", JSON.stringify(arr));

  return dispatch({
    type: "ADD_TRIP",
    data
  });
};
