import config from "@/common/config/index.js";
// 图片CDN
export const CDN = name => {
    return config.CDN + name;
};
/**
 * 获取指定数组指定key对应的值比较，若相等则返回该value值
 * @param arr Array       需要遍历的数组
 * @param key string       需要对比值的
 * @param find String     等待对比的值,默认对比id
 * @param result String   等待对比成功后返回的值,默认value
 */
export const getArrValue = (
	arr = [],
	key = "",
	find = "key",
	result = "value"
) => {
	let value = "";
	if (!arr.length) return;

	arr.map(function(item) {
		if (item[find] === key) {
			value = item[result];
		}
	});
	return value;
};