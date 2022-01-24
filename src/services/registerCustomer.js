import http from "./httpService"
import axios from 'axios'
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/user/register`;

export default function registerCustomer(customerData) {

    return http.post(apiEndPoint, customerData)
    .then(function (response) {
        console.log(response.data);
        console.log(response.headers)
        toast.success(`${response.data}`);
        return response.headers['x-auth-token']
    })
    .catch(function (error) {
        if(error.response.data) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
        if(error.response) {
            console.log(error.response);
            toast.error(error.response);
        }
        else {
            console.log(error);
            toast.error(error);
        }

    });

}