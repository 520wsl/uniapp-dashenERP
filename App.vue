<script>
import { getLoginUserInfo } from '@/common/libs/util/index.js'
export default {
    onLaunch: function() {
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
