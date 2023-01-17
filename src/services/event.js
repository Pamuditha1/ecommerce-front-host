import http from "./httpService";
import { api } from "./api";

const apiEndPoint = `${api}/event`;

export function addEvent(event) {
  return http
    .post(apiEndPoint, event)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    });
}
