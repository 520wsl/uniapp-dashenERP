import api from "@/common/libs/api.request.js";
const baseUrl = "";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}


export const getQysettingData=()=>{
    return post('/verification/send')
}