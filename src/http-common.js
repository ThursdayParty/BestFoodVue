import axios from "axios";

export default axios.create({
  baseURL: "http://80d98152.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});