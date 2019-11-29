import axios from "axios";

export default axios.create({
  baseURL: "http://70.12.227.239:9090/api",
  headers: {
    "Content-type": "application/json",
  }
});