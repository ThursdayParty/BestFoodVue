import axios from "axios";

export default axios.create({
  baseURL: "http://82c4d32e.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});