import config from "@/common/config/index.js";
import { appletAuth } from '@/common/api/login/index.js';
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

    arr.map(function (item) {
        if (item[find] === key) {
            value = item[result];
        }
    });
    return value;
};
// 退出登录 并跳到只等页面
export const logOut = (url = '/pages/login/login') => {
    uni.removeStorage({
        key: 'userInfo',
        complete: () => {
            uni.reLaunch({url});
            console.log('退出成功')
        }
    });
}
/** 
 * 支付宝登陆检测是否授权
 * 未授权 -> 页面登录
 * 已授权 -> 支付宝授权快捷登录
 */
export const getLoginUserInfo = (res) => {
	appletAuth({alipayAppletAuthId:res.authCode})
		.then( result => {
			// 查看绑定关系0未绑定1已绑定
			if(result.data.check == 0){
				uni.redirectTo({ url:'/pages/login/login' });
				return;
			}
			// 如果只有一家公司,登录成功,保存登陆信息
			if(result.data.memberId){
				uni.setStorage({
					key:'userInfo',
					data:res.data,
					success:(res)=>{
						console.log(res,'存储成功')
					}
				})
				return
			}
			// 如果有多家公司购买了ERP
			if(!result.data.memberId){
				uni.redirectTo({ url:'/pages/switch-company/switch-company' })
				return;
			}
		})
		.catch(err=>{
			uni.showModal({ title: '提示', content: err.msg, showCancel:false });
		})
}