import http from "./httpService";
import { toast } from "react-toastify";
import { api2 } from "./api";

const apiEndPoint = `${api2}/customer`;

export default function registerCustomer(customerData) {
  return http
    .post(apiEndPoint, customerData)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
      return response.data.token;
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
