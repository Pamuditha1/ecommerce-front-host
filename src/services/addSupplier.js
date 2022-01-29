import http from "./httpService";
import { toast } from "react-toastify";
import { api2 } from "./api";

const apiEndPoint = `${api2}/supplier`;

export default function registerSupplier(supplierData) {
  return http
    .post(apiEndPoint, supplierData)
    .then(function (response) {
      console.log(response.data);
      console.log(response.headers);
      toast.success(`${response.data}`);
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
