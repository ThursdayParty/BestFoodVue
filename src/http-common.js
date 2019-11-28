import axios from "axios";

export default axios.create({
  baseURL: "http://09b82e1d.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});