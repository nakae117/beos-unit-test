import axios from "axios";
import Vue from "vue";


const baseURL = "http://localhost/api/v1/";

axios.defaults.headers.common = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

axios.defaults.baseURL = baseURL;

Vue.prototype.$axios = axios;

export default axios;
