import axios from "axios";

export default axios.create({
  baseURL: "http://15024c07.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});