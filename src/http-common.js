import axios from "axios";

export default axios.create({
  baseURL: "http://c2e69867.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});