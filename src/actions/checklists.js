import axios from "axios";

export const addChecklist = checklist => ({
  type: "ADD_CHECKLIST",
  checklist
});

export const startAddChecklist = checklist => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/checklists", checklist);
      let checklists = JSON.parse(localStorage.getItem("checklists"));
      checklists.push(res.data);
      localStorage.setItem("checklists", JSON.stringify(checklists));
      dispatch(addChecklist(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const removeChecklist = ({ id } = {}) => ({
  type: "REMOVE_CHECKLIST",
  id
});

export const startRemoveChecklist = ({ id } = {}) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/checklists/${id}`);
      localStorage.setItem("checklists", JSON.stringify(res.data));
      dispatch(removeChecklist(id));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const editChecklist = (id, updates) => ({
  type: "EDIT_CHECKLIST",
  id,
  updates
});

export const startEditChecklist = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/checklists/${id}`, updates);
      localStorage.setItem("checklists", JSON.stringify(res.data));
      dispatch(editChecklist(id, updates));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const setChecklists = checklists => ({
  type: "SET_CHECKLISTS",
  checklists
});

export const startSetChecklists = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/checklists");
      localStorage.setItem("checklists", JSON.stringify(res.data));
      dispatch(setChecklists(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("checklists"));
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      if (res) {
        dispatch(setChecklists(res));
      } else {
        return error;
      }
    }
  };
};
