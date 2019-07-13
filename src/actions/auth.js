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
    const res = await axios.get("/auth/current_user");
    dispatch(
      login(
        res.data._id,
        res.data.displayName,
        res.data.email,
        res.data.photoURL
      )
    );
  };
};
