import axios from "axios";

export const login = (uid, displayName, email, photoURL) => ({
  type: "LOGIN",
  uid,
  displayName,
  email,
  photoURL
});

export const startLogin = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/auth/current_user");
      const authLocal = {
        ...res.data,
        uid: res.data._id
      };
      localStorage.setItem("auth", JSON.stringify(authLocal));
      dispatch(
        login(
          res.data._id,
          res.data.displayName,
          res.data.email,
          res.data.photoURL
        )
      );
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("auth"));
      if (res) {
        dispatch(login(res._id, res.displayName, res.email, res.photoURL));
      } else {
        return error;
        // need to load a message on the react app
      }
    }
  };
};
