import jwtDecode from "jwt-decode";

const hasAccessTo = (roles) => {
  const jwt = localStorage.getItem("admin-token");
  if (jwt) {
    const token = jwtDecode(jwt);
    const userType = token.type;

    return roles.includes(userType);
  }
  return false;
};

export default hasAccessTo;
