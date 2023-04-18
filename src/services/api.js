const PORT = 3002;
const PRODUCTION_API = process.env.REACT_APP_API
const DEVELOPMENT_API = `http://localhost:${PORT}/api`;

export const api =
  process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;
