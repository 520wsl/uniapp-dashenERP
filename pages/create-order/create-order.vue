<template>
	<view class="layout">
		<view class="main">
			<view class="collect-money">
				<view class="collect-money-title">
					<image @click="toclose()" :src="icon_money" style="width: 28upx; height: 28upx;"></image>
					收款金额:
				</view>
				<view class="collect-money-input">
					<text class="font-big">￥</text>
					<input
						v-model="totalMoney"
						type="digit"
						focus="true"
						maxlength="9"
						adjust-position="true"
						placeholder="请输入金额"
						placeholder-class="input-placeholder"
					/>
				</view>
				<!-- <view class="collect-money-remark">注：建议本次收款金额不能大于10000</view> -->
			</view>
			<view class="deliver-goods">
				<view class="deliver-goods-title">
					<image @click="toclose()" :src="icon_fahuo" style="width: 28upx; height: 28upx;"></image>
					发货方式:
				</view>
				<view class="btn-group">
					<view class="btn mar">
						<image :src="icon_success" style="width: 30upx; height: 30upx;"></image>
						自提
					</view>
					<view :class="deliveryType == 2? 'btn mar btn-active':'btn mar '" @tap="deliveryType=2">
						<image :src="icon_success" style="width: 30upx; height: 30upx;"></image>
						物流
					</view>
				</view>
			</view>
			<view class="deliver-goods-submit">
				<view class="btn-submit"  @tap="cashierAddAction">
					<image :src="icon_collect_money" style="width: 30upx; height: 30upx;"></image>
					确认收款
				</view>
			</view>
			<view class="collect-money-disabled" style="margin-top:60upx;">为配合阿里系统升级，暂停自提功能，预计4月15日恢复正常</view>
		</view>
		<textTab></textTab>
		<lvvPopup position="top" ref="lvvpopref">
			<view style="width: 100%;height: 100%;background: #f4f4f4;position: absolute;left:0;overflow-y: auto;">
				<view class="pay">
					<view class="pay-title">
						使用支付宝、淘宝或阿里巴巴APP扫一扫
						<image class="pay-title-close" @click="toclose()" :src="icon_close" style="width: 40upx; height: 40upx;"></image>
					</view>
					<view class="pay-info">
						<view class="pay-info-qrcode">
							<uni-app-qrcode :size="300" :val="detailsData.baseInfo.qrCode" :onval="true" />
						</view>
						
						<view class="pay-info-company">{{company}}</view>
						<view class="pay-info-status" @tap="getSaleOrderInfoAction()">
							<template v-if="!paymentInfoPayState">
								<image :src="icon_rest" style="width: 30upx; height: 30upx;"></image>
								<text style="color:#218FFF">刷新</text>，待支付
							</template>
							<template v-else>
								<image :src="icon_rest" style="width: 30upx; height: 30upx;"></image>
								扫码成功, <text style="color:#218FFF">等待支付</text>
							</template>
						</view>
						<view class="pay-info-money">
							付款金额：￥<text>{{detailsData.paymentInfo.tradingTotalAmount}}</text>
						</view>
						<view class="pay-info-icon">
							<image :src="icon_zfb" style="width: 100upx; height: 40upx;"></image>
							<image :src="icon_taobao" style="width: 80upx; height: 40upx;"></image>
							<image :src="icon_alibaba" style="width: 120upx; height: 40upx;"></image>
						</view>
					</view>
				</view>
			</view>
		</lvvPopup>
	</view>
</template>

<script>
	import lvvPopup from '@/components/lvv-popup/lvv-popup.vue'
	import { cashierAdd, getSaleOrderInfo } from '@/common/api/saleOrder/index'
	import uniAppQrcode from "@/components/uni-app-qrcode/uni-app-qrcode.vue"
	import textTab from "@/components/public/text-tab.vue"
	export default {
		components:{lvvPopup,uniAppQrcode,textTab},
		onHide(){
			console.warn('onHide')
			clearInterval(this.timer)
		},
		onUnload(){
			console.warn('onUnload')
			clearInterval(this.timer)
		},
		data() {
			return {
				saleOrder:'',
				// 定时器
				timer:null,
				totalMoney:'',
				company:'',
				// 1自提 2物流
				deliveryType:2,
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
			icon_taobao() {
				return this.$CDN('icon_taobao.png');
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
			icon_success() {
				return this.$CDN('icon_success.png');
			},
			icon_ok() {
				return this.$CDN('icon_ok.png');
			},
			icon_collect_money(){
				return this.$CDN('icon_collect_money.png');
			},
			paymentInfoPayState() {
				// 0待付款 1已付款 2已扫码未付款 
			    return this.detailsData.paymentInfo.payState == 2
			}
		},
		methods:{
			// 显示弹出框
			toshow(){
				console.warn('toshow')
				// clearInterval(this.timer)
				this.$refs.lvvpopref.show();
			},
			// 关闭弹出框
			toclose(){
				console.warn('toclose')
				// 关闭轮询刷新二维码
				clearInterval(this.timer)
				this.$refs.lvvpopref.close();
			},
			// 
			getSaleOrderInfoAction(){
				getSaleOrderInfo({saleOrder:this.saleOrder,state:0})
					.then(res =>{
						if (res.status !== 200) return
						this.detailsData.baseInfo = res.data.baseInfo || {}
						this.detailsData.logisticsInfo = res.data.logisticsInfo || {}
						this.detailsData.paymentInfo = res.data.paymentInfo || {}
						this.detailsData.productInfo = res.data.productInfo || []
						this.detailsData.productInfoTotal = res.data.productInfoTotal || {}
						// 设置公司名
						uni.getStorage({
							key:'userInfo',
							success:(res)=>{
								this.company = res.data.companyName
							}
						})
						// 如果支付成功,停止定时器，跳轉頁面
						if(this.detailsData.paymentInfo.payState == 1){
							clearInterval(this.timer)
							uni.redirectTo({ url:'/pages/create-order/pay-success?money=' + this.detailsData.paymentInfo.tradingTotalAmount})
							return;
						}
					})
					.catch(err=>{
						if(err.status == 403) {
							uni.showModal({ title: '提示', content: err.msg, showCancel:false });
						}
					})
			},
			cashierAddAction(){
				if(!this.totalMoney){
					uni.showModal({ title: '提示', content: '请输入收款金额', showCancel:false });
					return;
				}
				if(!/^(\d+|\d+\.\d{1,2})$/.test(this.totalMoney)){
					uni.showModal({ title: '提示', content: '收款金额仅允许保留两位小数', showCancel:false });
					return;
				}
				if(this.totalMoney>1000000){
					uni.showModal({ title: '提示', content: '单笔收款金额不得大于100万', showCancel:false });
					return;
				}
				cashierAdd({totalMoney:this.totalMoney,deliveryType:this.deliveryType})
					.then(res=>{
						if (res.status !== 200) return;
						this.saleOrder = res.data
						this.getSaleOrderInfoAction()
						// 轮询获取二维码
						this.timer = setInterval(() => {
							this.getSaleOrderInfoAction()
						}, 3000)
						this.toshow()
					})
					.catch(err =>{
						if(err.status == 403) {
							uni.showModal({ title: '提示', content: err.msg, showCancel:false });
						}
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		height: 100%;
		overflow-y: auto;
	}
	.layout{
		/* #ifdef MP-ALIPAY || MP-WEIXIN */
		min-height: 100vh;
		/* #endif */
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f4f4f4;
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
		font-size: 28upx;
		color: #444444;
		& > image{
			margin-right:20upx;
		}
	}
	// 设置input样式
	.input-placeholder{
		font-size:26upx;
	}
	.collect-money-input{
		display: flex;
		margin:42upx 0 62upx 30upx;
		align-items: center;
		// justify-content: center;
		align-items: center;
		.font-big{
			font-size: 52upx;
			color: #444444;
			padding-right: 24upx;
		}
		input{
			height:70upx;
			font-size: 60upx;
			color: #444444;
			flex: 1;
		}
	}
	.collect-money-remark{
		font-size: 24upx;
		color: #999999;
	}
	.collect-money-disabled{
		margin:0 20upx;
		border: 2upx solid #ffe1de;
		background-color: #fff2f0;
		font-size: 24upx;
		line-height: 32ipx;
		color: #999999;
		position: relative;
		padding: 16upx 20upx;
		border-radius: 8upx;
		color: #ff0000;
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
		font-size: 28upx;
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
		position:relative;
		display: inline-block;
		padding: 10upx 0;
		width: 176upx;
		text-align: center;
		background: #FFFFFF;
		border: 2upx solid #D9D9D9;
		border-radius: 5upx;
		font-size: 28upx;
		color: #666666;
		image{
			display:none
		}
	}
	.btn-active{
		border: 1upx solid #4390E9;
		color: #4390E9;
		image{
			position:absolute;
			display:block;
			top:-15upx;
			right:-15upx;
		}
	}
	.mar{
		margin:0 30upx ;
	}
	.deliver-goods-submit{
		text-align: center;
	}
	.btn-submit{
		display: flex;
		justify-content: center;
		align-items: center;
		margin:50upx auto;
		border-radius: 8upx;
		width: 400upx;
		height: 72upx;
		font-size:28upx;
		color:#fff;
		background: #007aff;
		image{
			margin-right:20upx;
		}
	}
	.main{
		flex: 1
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
		font-size: 26upx;
		background: #FC8351;
		color: #FFFFFF;
		text-align: center;
		border-radius: 15upx 15upx 0 0;
	}
	.pay-title-close{
		position: absolute;
		top:10upx;
		right:10upx;
	}
	.pay-info{
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
	}
	.pay-info-qrcode{
		display: flex;
// 		width: 300upx;
// 		height: 300upx;
		margin:40upx 0 20upx 0;
	}
	.pay-info-company{
		font-size: 24upx;
		color: #666666;
	}
	.pay-info-status{
		display: flex;
		align-items: center;
		margin:52upx 0;
		font-size: 24upx;
		color: #3F3F3F;
		text{
			margin-left: 20upx;
		}
	}
	.pay-info-money{
		font-size: 30upx;
		color: #999999;
		text{
			font-size: 34upx;
			color: #000000;
		}
	}
	.pay-info-icon{
		margin:72upx 0 40upx 0;
		image{
			margin:0 47upx;
		}
	}
	input::-webkit-input-placeholder{
		font-size:26upx;}
	input:-moz-placeholder{
		font-size:26upx;}
	input::-moz-placeholder{
		font-size:26upx;}
	input:-ms-input-placeholder{
		font-size:26upx;}
</style>
