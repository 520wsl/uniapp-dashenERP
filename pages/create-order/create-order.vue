<template>
	<view class="layout">
		<view class="main">
			<view class="collect-money">
				<view class="collect-money-title">
					<image @click="toclose()" :src="icon_money" style="width: 40upx; height: 40upx;"></image>
					收款金额:
				</view>
				<view class="collect-money-input">
					<text class="font-big">￥</text>
					<input type="number" v-model="totalMoney" focus="true" />
					<!-- placeholder-class="placeholder-class" -->
					<!-- 修改placeholder的样式大小 -->
					<!-- placeholder="点击输入金额" -->
				</view>
				<!-- <view class="collect-money-remark">注：建议本次收款金额不能大于10000</view> -->
			</view>
			<view class="deliver-goods">
				<view class="deliver-goods-title">
					<image @click="toclose()" :src="icon_fahuo" style="width: 40upx; height: 40upx;"></image>
					发货方式:
				</view>
				<view class="btn-group">
					<view class="btn mar btn-active">自提</view>
					<view class="btn mar">物流</view>
				</view>
			</view>
			<view class="deliver-goods-submit" @click="cashierAddAction">
				<button class="submit" type="primary"  size="mini">确认</button>
			</view>
		</view>
		<view class="footer">
			<text @tap="routerTo('/pages/online-record/index')">交易记录</text>
			|
			<text @tap="routerTo('/pages/switch-company/switch-company')">切换店铺</text>
		</view>
		<lvvPopup position="top" ref="lvvpopref">
			<view style="width: 100%;height: 100%;background: #f4f4f4;position: absolute;left:0;">
				<view class="pay">
					<view class="pay-title">
						使用支付宝、淘宝或阿里巴巴APP扫一扫
						<image class="pay-title-close" @click="toclose()" :src="icon_close" style="width: 20px; height: 20px;"></image>
					</view>
					<view class="pay-info">
						<view class="qrcode" v-if="detailsData.baseInfo.qrCode">
							<uni-app-qrcode :size="300" :val="detailsData.baseInfo.qrCode" :loadMake="true" :onval="true" />
						</view>
						<view class="pay-info-company">{{detailsData.baseInfo.customerName}}</view>
						<view class="pay-info-status">
							<image :src="icon_rest" style="width: 20px; height: 20px;"></image>
							<text @tap="getSaleOrderInfoAction()">刷新</text>{{paymentInfoPayState}}
						</view>
						<view class="pay-info-money">
							付款金额：￥<text>100,5.00</text>
						</view>
						<view class="pay-info-icon">
							<image :src="icon_zfb" style="width: 20px; height: 20px;"></image>
							<image :src="icon_zfb" style="width: 20px; height: 20px;"></image>
							<image :src="icon_alibaba" style="width: 20px; height: 20px;"></image>
						</view>
					</view>
				</view>
			</view>
		</lvvPopup>
	</view>
</template>

<script>
	import lvvPopup from '@/components/lvv-popup/lvv-popup.vue'
	import {getSaleOrderInfo,cashierAdd} from '@/common/api/saleOrder'
	import uniAppQrcode from "@/components/uni-app-qrcode/uni-app-qrcode.vue"
	export default {
		components:{lvvPopup,uniAppQrcode},
		data() {
			return {
				saleOrder:'',
				totalMoney:'',
				// 1自提 2物流
				deliveryType:1,
				detailsData:{
					baseInfo:{},
					logisticsInfo:{},
					paymentInfo:{},
					productInfo:{},
					productInfoTotal:{}
				}
			};
		},
		computed:{
			
			icon_close() {
				return this.$CDN('icon_close.png');
			},
			icon_alibaba() {
				return this.$CDN('icon_alibaba.png');
			},
			icon_zfb() {
				return this.$CDN('icon_zfb.png');
			},
			icon_rest() {
				return this.$CDN('icon_rest.png');
			},
			icon_fahuo() {
				return this.$CDN('icon_fahuo.png');
			},
			icon_money() {
				return this.$CDN('icon_money.png');
			},
			paymentInfoPayState() {
			  return this.detailsData.paymentInfo.payState == 0 ? '待付款':'已付款'
			}
		},
		methods:{
			// 显示弹出框
			toshow(){
				this.$refs.lvvpopref.show();
			},
			// 关闭弹出框
			toclose(){
				this.$refs.lvvpopref.close();
			},
			// 
			async getSaleOrderInfoAction(){
				let res = await getSaleOrderInfo(this.saleOrder,0)
				if (res.status !== 200) return
				this.detailsData.baseInfo = res.data.baseInfo || {}
				this.detailsData.logisticsInfo = res.data.logisticsInfo || {}
				this.detailsData.paymentInfo = res.data.paymentInfo || {}
				this.detailsData.productInfo = res.data.productInfo || []
				this.detailsData.productInfoTotal = res.data.productInfoTotal || {}
			},
			async cashierAddAction(){
				let res = await cashierAdd(this.totalMoney,0)
				if (res.status !== 200) return
				this.getSaleOrderInfoAction()
				this.toshow()
			},
			routerTo(url){
				uni.redirectTo({ url });
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
		display:flex;
		align-items:center;
		font-size: 14px;
		color: #444444;
		& > image{
			margin-right:20upx;
		}
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
		display:flex;
		align-items:center;
		font-size: 14px;
		color: #444444;
		& > image{
			margin-right:20upx;
		}
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
