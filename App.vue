<script>
	/** 
	 * 检测是否授权
	 * 未授权 -> 页面登录
	 * 已授权 -> 支付宝快捷登录
	 */
let getLoginUserInfo = function(res){
	// 
	uni.request({
		 url:'http://172.30.34.39:9101/api/alipay/applet/auth',
		 method:'POST',
		 data:{
			 alipayAppletAuthId:res.authCode
		 },
		 success:(res)=>{
			// 如果没有购买ERP服务
			if(true){
				uni.redirectTo({
					url:'/pages/login/login'
				})
				return;
			}
			// 如果有多家公司购买了ERP
			if(true){
				uni.redirectTo({
					url:'/pages/switch-company/switch-company'
				})
				return;
			}
			// 对获取到的用户信息进行存储
			uni.setStorage({
				key:'userInfo',
				data:res.data,
				success:(res)=>{
					console.log(res,'存储成功')
				}
			})
		 }
	})
}
export default {
    onLaunch: function() {
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
		
		// #ifdef H5
			getLoginUserInfo()
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
