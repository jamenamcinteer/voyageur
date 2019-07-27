import axios from "axios";

// EDIT_USER
export const editUser = (id, updates) => ({
  type: "EDIT_USER",
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/users/${id}`, updates);
      dispatch(editUser(id, updates));
      return res.data;
    } catch (error) {
      return error;
    }
  };
};

// SET_USERS
export const setUsers = users => ({
  type: "SET_USERS",
  users
});

export const startSetUsers = id => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      dispatch(setUsers(res.data));
      return res.data;
    } catch (error) {
      return error;
    }
  };
};

// REMOVE_USER
// export const removeUser = ({ id } = {}) => ({
//   type: "REMOVE_User",
//   id
// });

// export const startRemoveUser = ({ id } = {}) => {
//   return async dispatch => {
//     await axios.delete(`/api/users/${id}`);
//     dispatch(removeUser(id));
//   };
// };
