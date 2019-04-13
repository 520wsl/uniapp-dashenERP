<template>
	<view class="layout">
		<view class="main">
			<image class="icon_success" :src="icon_success_big"></image>
			<view class="pay-success-text">已收款</view>
			<view class="money">￥{{money}}</view>
			<view class="again" @tap="routerTo('/pages/create-order/create-order')">
				再次收款
				<image :src="icon_again" style="width:28upx;height:28upx"></image>
			</view>
		</view>
		<textTab></textTab>
	</view>
</template>

<script>
	import textTab from "@/components/public/text-tab.vue"
	export default {
		components:{textTab},
		onLoad(option){
			this.money = option.money
		},
		data() {
			return {
				money:0,
			};
		},
		computed:{
			icon_success_big: function() {
				return this.$CDN('icon_success_big.png');
				// return 'http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image/icon_warning_min.png'
			},
			icon_again: function() {
				return this.$CDN('icon_again.png');
				// return 'http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image/icon_warning_min.png'
			},
			// icon_again
		},
		methods:{
			routerTo(url){
				uni.redirectTo({ url });
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		height: 100%;
	}
	.layout{
		height: 100%;
		display: flex;
		background: #f4f4f4;
		flex-direction: column;
		text-align:center;
		font-family: PingFangSC-Medium;
	}
	.main{
		flex:1;
		display:flex;
		flex-direction: column;
		align-items: center;
		image{
			margin-left:20upx;
		}
	}
	.icon_success{
		margin:74upx 0 36upx 0;
		height: 100upx;
		width: 100upx;
	}
	.pay-success-text{
		font-size: 14px;
		color: #999999;
	}
	.money{
		margin-top:40upx;
		font-size: 48upx;
		color: #444444;
	}
	.again{
		margin-top:524upx;
		color:#218FFF;
		font-size:26upx;
		display:flex;
		align-items:center;
	}
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
