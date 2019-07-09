export const login = async (state, dispatch) => {
  let response = await fetch(`http://localhost:3001/auth/current_user`);
  let data = await response.json();

  return dispatch({
    type: "LOGIN",
    uid: data._id,
    displayName: data.displayName,
    email: data.email,
    photoURL: data.photoURL
  });
};
