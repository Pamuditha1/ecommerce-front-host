const PORT = 3002;
const PRODUCTION_API =
  process.env.API || "https://research-ecommerce-back.onrender.com/api";
const DEVELOPMENT_API = `http://localhost:${PORT}/api`;

export const api =
  process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;
