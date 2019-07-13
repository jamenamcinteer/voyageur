export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
        displayName: action.displayName,
        email: action.email,
        photoURL: action.photoURL
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
