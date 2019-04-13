<template>
	<view class="footer">
		<text @tap="routerTo('/pages/online-record/index')">交易记录</text>
		|
		<text @tap="routerTo('/pages/switch-company/switch-company')">切换店铺</text>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			routerTo(url){
				uni.navigateTo({ url });
			}
		}
	}
</script>

<style lang="less" scoped>
// .footer{
// 	padding:40upx 0;
// 	text-align: center;
// 	font-size: 26upx;
// 	color: #999999;
// 	text{
// 		margin:0 20upx;
// 	}
// }
.footer{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 98upx;
	border-top:#E4E4E4;
	background: #fff;
	font-size:26upx;
	color: #999999;
	text{
		flex:1;
		text-align: center;
	}
}
</style>
