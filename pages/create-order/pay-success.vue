<template>
	<view>
		<image class="logo" :src="icon_success"></image>
		<view>已收款</view>
		<view>￥</view>
		<view>再次收款</view>
		<view class="footer">
			<text @tap="routerTo('/pages/online-record/index')">交易记录</text>
			|
			<text @tap="routerTo('/pages/switch-company/switch-company')">切换店铺</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icon_success: function() {
					return this.$CDN('icon_success.png');
					// return 'http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image/icon_warning_min.png'
				}
			};
		},
		methods:{
			routerTo(url){
				uni.redirectTo({ url });
			}
		}
	}
</script>

<style lang="less">

	.footer{
		padding:40upx 0;
		text-align: center;
		font-size: 13px;
		color: #999999;
		text{
			margin:0 20upx;
		}
	}
</style>
