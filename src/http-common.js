import axios from "axios";

export default axios.create({
  baseURL: "http://03472c2b.ngrok.io/api",
  headers: {
    "Content-type": "application/json",
  }
});