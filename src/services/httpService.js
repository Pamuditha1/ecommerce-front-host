import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expextedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expextedError) {
    console.log("Logging the error", error);
    toast.error("An unexpexted error occured.");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
