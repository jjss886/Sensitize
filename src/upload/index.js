import axios from "axios";

const instance = axios.create({
  baseUrl: "https://sensitize-56568.firebaseio.com/"
});

export default instance;
export { default as TestUpload } from "./TestUpload";
