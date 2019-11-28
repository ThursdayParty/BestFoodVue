import axios from "axios";

export default axios.create({
  baseURL: "http://b59caac0.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});