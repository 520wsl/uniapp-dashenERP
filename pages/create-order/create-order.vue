<template>
	<view class="layout">
		<view class="main">
			<view class="collect-money">
				<view class="collect-money-title">收款金额:</view>
				<view class="collect-money-input">
					<text class="font-big">￥</text>
					<input type="number" :value="money" focus="true" />
					<!-- placeholder-class="placeholder-class" -->
					<!-- 修改placeholder的样式大小 -->
					<!-- placeholder="点击输入金额" -->
				</view>
				<!-- <view class="collect-money-remark">注：建议本次收款金额不能大于10000</view> -->
			</view>
			<view class="deliver-goods">
				<view class="deliver-goods-title">发货方式:</view>
				<view class="btn-group">
					<view class="btn mar btn-active">自提</view>
					<view class="btn mar">物流</view>
				</view>
			</view>
			<view class="deliver-goods-submit" @click="toshow()">
				<button class="submit" type="primary"  size="mini">确认</button>
			</view>
		</view>
		<view class="footer">
			<text>交易记录</text>
			|
			<text>切换店铺</text>
		</view>
		<lvvPopup position="top" ref="lvvpopref">
			<view style="width: 100%;height: 100%;background: #f4f4f4;position: absolute;left:0;">
				<view class="pay">
					<view class="pay-title">
						使用支付宝、淘宝或阿里巴巴APP扫一扫
						<image class="pay-title-close" @click="toclose()" src="../../static/logo.png" style="width: 20px; height: 20px;"></image>
					</view>
					<view class="pay-info">
						<image class="qrcode" src="../../static/logo.png"></image>
						<view class="pay-info-company">企顺管业科技有限公司付款专用</view>
						<view class="pay-info-status">
							<image src="../../static/logo.png" style="width: 20px; height: 20px;"></image>
							<text>刷新</text>支付状态
						</view>
						<view class="pay-info-money">
							付款金额：￥<text>100,5.00</text>
						</view>
						<view class="pay-info-icon">
							<image src="../../static/logo.png" style="width: 20px; height: 20px;"></image>
							<image src="../../static/logo.png" style="width: 20px; height: 20px;"></image>
							<image src="../../static/logo.png" style="width: 20px; height: 20px;"></image>
						</view>
					</view>
				</view>
			</view>
		</lvvPopup>
	</view>
</template>

<script>
	import lvvPopup from '@/components/lvv-popup/lvv-popup.vue'
	export default {
		components:{lvvPopup},
		data() {
			return {
				money:''
			};
		},
		methods:{
			// 显示modal弹出框
			toshow(){
				this.$refs.lvvpopref.show();
			},
			// 关闭modal弹出框
			toclose(){
				this.$refs.lvvpopref.close();
			}
		}
	}
</script>

<style lang="less" scoped>
	page,.layout{
		min-height:100vh;
		background: #f4f4f4;
	}
	.layout{
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Medium;
	}
	.collect-money{
		margin:16upx 0 0 0;
		padding:30upx 34upx 20upx 34upx;
		background: #fff;
	}
	.collect-money-title{
		font-size: 14px;
		color: #444444;
	}
	.collect-money-input{
		display: flex;
		margin:42upx 0 62upx 30upx;
		align-items: center;
		// justify-content: center;
		align-items: center;
		.font-big{
			font-size: 26px;
			color: #444444;
			padding-right: 24upx;
		}
		input{
			font-size: 30px;
			color: #444444;
			flex: 1;
		}
	}
	.collect-money-remark{
		font-size: 12px;
		color: #999999;
	}
	// 发货
	.deliver-goods{
		margin:16upx 0 0 0;
		padding:30upx 34upx 34upx 34upx;
		background: #fff;
	}
	.deliver-goods-title{
		font-size: 14px;
		color: #444444;
	}
	.btn-group{
		// display: flex;
		padding:38upx 0;
		text-align: center;
	}
	.btn{
		display: inline-block;
		padding: 10upx 0;
		width: 176upx;
		text-align: center;
		background: #FFFFFF;
		border: 1px solid #D9D9D9;
		border-radius: 5upx;
		font-size: 14px;
		color: #666666;
	}
	.mar{
		margin:0 30upx ;
	}
	.deliver-goods-submit{
		text-align: center;
	}
	.submit{
		margin:30upx 0;
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
	}
	.main{
		flex: 1
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
	// 这里是弹窗的页面
	.pay{
		margin:30upx 30upx;
		// 在圆角情况下，不会按照圆角出现阴影
		// border-shadow: #e8e8e8 1px 5px 10px 5px;
	}
	.pay-title{
		position: relative;
		height: 98upx;
		height: 98upx;
		line-height: 98upx;
		font-size: 13px;
		background: #FC8351;
		color: #FFFFFF;
		text-align: center;
		border-radius: 30upx 30upx 0 0;
	}
	.pay-title-close{
		position: absolute;
		top:15upx;
		right:40upx;
	}
	.pay-info{
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
	}
	.qrcode{
		width: 300upx;
		height: 300upx;
		margin:40upx 0 20upx 0;
	}
	.pay-info-company{
		font-size: 12px;
		color: #666666;
	}
	.pay-info-status{
		display: flex;
		justify-items: center;
		align-items: center;
		margin:52upx 0;
		font-size: 12px;
		color: #3F3F3F;
		text{
			margin-left: 20upx;
		}
	}
	.pay-info-money{
		ont-size: 15px;
		color: #999999;
		text{
			font-size: 17px;
			color: #000000;
		}
	}
	.pay-info-icon{
		margin:72upx 0 30upx 0;
		image{
			margin:0 47upx;
		}
	}
</style>
