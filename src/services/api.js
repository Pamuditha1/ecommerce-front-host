const PORT = 3002;
const PRODUCTION_API = process.env.REACT_APP_API || "https://dsccapp.azurewebsites.net/api"
const DEVELOPMENT_API = `http://localhost:${PORT}/api`;

export const api = PRODUCTION_API
  // process.env.NODE_ENV === "development" ? DEVELOPMENT_API : PRODUCTION_API;
