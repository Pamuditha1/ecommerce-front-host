import http from "./httpService";
import { toast } from "react-toastify";
import { api2 } from "./api";

const apiEndPoint = `${api2}/user`;

export default function registerUser(user) {
  return http
    .post(apiEndPoint, user)
    .then(function (response) {
      toast.success(`${response.data}`);
      return response.status;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}
