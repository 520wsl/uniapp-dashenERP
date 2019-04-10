import api from "@/common/libs/api.request.js";
const baseUrl = "/login";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}


export const verification = ({ phone, verification})=>{
    return post('/verification',{ phone, verification})
}
export const getCompanyList = ()=>{
    return post('/getCompanyList',{})
}
export const chooseCompany= ({memberId})=>{
    return post('/choose/company/login',{memberId})
}

export const appletAuth = ({ alipayAppletAuthId})=>{
    return post('/alipay/applet/auth',{ alipayAppletAuthId})
}

export const appletAuthBinding = ({phone,verification,alipayAppletAuthId})=>{
    return post('/alipay/applet/auth/binding',{phone,verification,alipayAppletAuthId})
}