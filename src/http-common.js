import axios from "axios";

export default axios.create({
  baseURL: "http://0f5a5a5d.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});