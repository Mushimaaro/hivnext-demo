import axios from "axios";

const backendURL = "https://hivnext-demo.onrender.com/"
const baseURL = backendURL + "api/";

export const normalAxios = axios.create({
   baseURL: baseURL,
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
   },
});

export const axiosPrivate = axios.create({
   baseURL: baseURL,
   headers: {
      'Content-Type': 'application/json'
   },
   withCredentials: true
});
