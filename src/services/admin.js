import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/user`;

export function registerUser(user) {
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

export function userLogin(loginData) {
  return http
    .post(`${apiEndPoint}/login`, loginData)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
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
