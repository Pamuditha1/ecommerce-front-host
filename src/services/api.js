const PORT = 3002;
const PRODUCTION_API =
  process.env.API || "https://ecommerce-app-back.herokuapp.com/api";
const DEVELOPMENT_API = `http://localhost:${PORT}/api`;

export const api = PRODUCTION_API;
// process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;
