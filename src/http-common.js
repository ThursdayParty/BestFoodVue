import axios from "axios";

export default axios.create({
  baseURL: "http://2e8a0ee0.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});