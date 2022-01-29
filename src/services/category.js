import http from "./httpService";
import { toast } from "react-toastify";
import { api2 } from "./api";

const apiEndPoint = `${api2}/category`;

export function addCategory(name) {
  return http
    .post(apiEndPoint, name)
    .then(function (response) {
      return toast.success(`${response.data}`);
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

export function getCategories() {
  return http
    .get(apiEndPoint)
    .then(function (response) {
      return response.data;
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

export function updateCategory(id, category) {
  return http
    .put(`${apiEndPoint}/${id}`, category)
    .then(function (response) {
      return toast.success(`${response.data}`);
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
