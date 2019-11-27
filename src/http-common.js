import axios from "axios";

export default axios.create({
  baseURL: "http://68dcb0fc.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});