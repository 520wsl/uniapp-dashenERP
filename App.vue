<script>
import { appletAuth } from '@/common/api/login/index.js';
/** 
 * 检测是否授权
 * 未授权 -> 页面登录
 * 已授权 -> 支付宝授权快捷登录
 */
let getLoginUserInfo = async function(res){
	let result = await appletAuth({alipayAppletAuthId:res.authCode});
	result = result.data
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
}
export default {
    onLaunch: function() {
// 		uni.redirectTo({ url:'/pages/create-order/pay-success?money=500' })
// 		return;
		// #ifdef H5 || MP-WEIXIN
			// 判断是否登录
			uni.getStorage({
				key:'userInfo',
				success:(res)=>{
					console.log(res,'已登录状态')
				},
				fail:()=>{
					uni.redirectTo({ url:'/pages/login/login' })
				}
			})
		// #endif
		
		// 支付宝快捷登录
		// #ifdef MP-ALIPAY
			my.getAuthCode({
			  scopes: 'auth_base',
			  success: (res) => {
				 console.log(res)
				 if(!res.authCode) {
					 console.error('未获取到authCode')
					 return;
				 }
				 getLoginUserInfo(res)
			  },
			});
		// #endif
		
		// #ifdef MP-WEIXIN
			console.log('微信')
		// #endif
    },
    onShow: function() {
        console.log('App Show');
    },
    onHide: function() {
        console.log('App Hide');
    },
};
</script>

<style scoped lang="less">
/*每个页面公共css */
@import url('./common/style/common.less');
</style>
