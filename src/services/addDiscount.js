import http from "./httpService";
import { toast } from "react-toastify";
import { api2 } from "./api";

const apiEndPoint = `${api2}/product/discount`;

export default function addDiscount(discountData) {
  return http
    .put(apiEndPoint, discountData)
    .then(function (response) {
      if (response.data === "Discount Updated")
        return toast.success(`${response.data}`);
      toast.error(`${response.data}`);
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
