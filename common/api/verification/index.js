import api from "@/common/libs/api.request.js";
const baseUrl = "/verification";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 验证码发送
export const verificationSend = ({
    check,
    phone
}) => {
    return post('/send', {
        check,
        phone
    })
}
