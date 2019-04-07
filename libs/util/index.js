import config from "../../config/index.js";
// 图片CDN
export const CDN = name => {
    return config.CDN + name;
};
