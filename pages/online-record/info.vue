<template>
	<view class="order-info">
		<view class="info-top" v-if="!isShowProductInfo">
			<view class="money">{{info.paymentInfo && info.paymentInfo.tradingTotalAmount? '￥'+info.paymentInfo.tradingTotalAmount : ''}}</view>
			<view class="state">{{paymentStatusName}}</view>
			<view class="info-top-item">
				<text class="title">订单号：</text>
				<text>{{params.saleOrder}}</text>
			</view>
			<view class="info-top-item">
				<text class="title">发货方式：</text>
				<text>{{info.baseInfo && info.baseInfo.deliveryTypeName?info.baseInfo.deliveryTypeName:''}}</text>
			</view>
			<view class="info-top-item">
				<text class="title">下单时间：</text>
				<text>{{info.baseInfo && info.baseInfo.createdAtTime?info.baseInfo.createdAtTime:''}}</text>
			</view>
			<view class="info-top-item">
				<text class="title">下单账号：</text>
				<text>{{info.baseInfo && info.baseInfo.buyerId?info.baseInfo.buyerId:''}}</text>
			</view>
			<view class="qrcode" v-if="info.baseInfo && info.baseInfo.qrCode">
				<uni-app-qrcode :size="318" :val="info.baseInfo.qrCode" :loadMake="true" :onval="true" />
			</view>
		</view>
		<view :class="isShowProductInfo?'product product-change':'product'">
			<view class="product-title" @tap="changeShowInfo">
				<text class="title">商品信息</text>
				<view class="arrow-big"></view>
				<view class="arrow-small"></view>
			</view>
			<view class="product-list">
				<view class="product-list-item" v-for="(item, index) in info.productInfo" :key="index">
					<view class="item-head">
						<image v-if="item.masterImage" class="img" mode="widthFix" :src="item.masterImage"></image>
						<text class="subject">{{item.subject}}</text>
					</view>
					<view class="item-info">
						<view class="spec">{{item.specInfo}}</view>
						<view class="price">
							<text>{{item.price}}</text>
							<text>数量：{{item.orderNum}}</text>
							<text class="red">{{'￥'+item.money}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="product-total">
				总计：
				<text>货品：<text class="red">{{info.productInfoTotal && info.productInfoTotal.species?info.productInfoTotal.species:0}}种</text></text>
				<text>数量：<text class="red">{{info.productInfoTotal && info.productInfoTotal.piece?info.productInfoTotal.piece:0}}种</text></text>
			</view>
		</view>
		<neil-modal :show="modal.show" title="提示" :content="modal.content" :auto-close="false" :show-cancel="false" @confirm="modal.show = !modal.show">
		</neil-modal>
	</view>
</template>

<script>
	import {
		formatTime
	} from '@/common/libs/util/time.js';
	import {
		getArrValue
	} from "@/common/libs/util/index.js";
	import {
		getSaleOrderInfo
	} from '@/common/api/saleOrder/index.js';
	import uniAppQrcode from "@/components/uni-app-qrcode/uni-app-qrcode.vue"
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	export default {
		data() {
			return {
				// 当前订单详情状态名
				paymentStatusName: '',
				// 订单详情商品详情
				isShowProductInfo: false,
				params: {
					state: 0,
					saleOrder: ''
				},
				info: {
					productInfo: [],
					productInfoTotal: {
						species: 0,
						piece: 0
					},
					baseInfo: {}
				},
				paymentStatusList: [{
						key: 0,
						value: '代支付'
					},
					{
						key: 1,
						value: '已支付'
					},
					{
						key: 2,
						value: '已扫码，待支付'
					}
				],
				// 弹窗属性
				modal: {
					show: false,
					content: ''
				}
			}
		},
		components: {
			uniAppQrcode,
			neilModal
		},
		computed: {},
		onLoad(option) {
			console.log(option)
			this.params.saleOrder = option.saleOrder;
			this.getInfo();
		},
		onReachBottom() {},
		methods: {
			// 展示订单商品信息切换
			changeShowInfo() {
				this.isShowProductInfo = !this.isShowProductInfo;
			},
			getInfo() {
				let params = {
					...this.params
				}
				getSaleOrderInfo(params).then(result => {
					let res = result.data;
					if (res.status !== 200) {
						this.modal.content = res.msg;
						this.modal.show = true;
						return;
					}
					let info = res.data;
					let payState = info && info.paymentInfo && info.paymentInfo.payState || 0;
					this.paymentStatusName = getArrValue(this.paymentStatusList, payState);
					info.baseInfo.createdAtTime = formatTime(info.baseInfo.created, "YYYY-MM-DD HH:mm:SS");
					info.baseInfo.deliveryTypeName = info.baseInfo.deliveryType == 1 ? '自提' : '物流';
					this.info = info;
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		min-height: 100%;
		background: #f4f4f4;
	}

	.order-info {
		position: relative;
	}

	.info-top {
		.money {
			font-size: 40upx;
			color: #444444;
			line-height: 56upx;
			padding-top: 30upx;
			text-align: center;
		}

		.state {
			font-size: 26upx;
			color: #FF8609;
			text-align: center;
			margin-top: 16upx;
			line-height: 36upx;
			padding-bottom: 30upx;
		}

		.qrcode {
			background: #fff;
			border: 1upx solid #E7E7E7;
			width: 318upx;
			margin: 17upx auto 0;
			padding: 22upx 24upx;
		}

		.info-top-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26upx;
			color: #444444;
			padding: 16upx 30upx 0;

			.title {
				color: #999;
			}
		}
	}

	.product {
		position: fixed;
		bottom: 0;
		height: 82upx;
		overflow: hidden;
		width: 100%;
		z-index: 1000;

		.product-title {
			height: 82upx;
			font-size: 30upx;
			background: #fff;
			color: #444444;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;
			position: relative;

			.title {
				display: block;
				padding-left: 24upx;
				line-height: 36upx;
				border-left: 10upx solid #4786ED;
			}

			& .arrow-big {
				width: 0;
				height: 0;
				border-width: 16upx;
				border-style: solid;
				border-color: transparent transparent #979797 transparent;
				position: absolute;
				top: 22upx;
				right: 40upx;
			}

			& .arrow-small {
				width: 0;
				height: 0;
				border-width: 14upx;
				border-style: solid;
				border-color: transparent transparent #fff transparent;
				position: absolute;
				top: 26upx;
				right: 42upx;
			}
		}
	}

	.product-change {
		height: auto;
		top: 0upx;

		.product-title {
			& .arrow-big {
				border-color: #979797 transparent transparent transparent;
				top: 26upx;
				right: 40upx;
			}

			& .arrow-small {
				border-color: #fff transparent transparent transparent;
				top: 26upx;
				right: 42upx;
			}
		}
	}

	/*  #ifdef  H5  */
	.product-change {
		top: 80upx;
	}

	/*  #endif  */
	.product-list {
		margin-top: 2upx;

		.product-list-item {
			background: #fff;
			padding: 22upx 30upx 16upx;

			.item-head {
				display: flex;
				align-items: flex-start;
				justify-content: flex-start;

				.img {
					width: 100upx;
					margin-right: 36upx;
				}

				.subject {
					font-size: 26upx;
					color: #444444;
					line-height: 36upx;
				}
			}

			.item-info {
				margin-top: 20upx;
				background: #F7FCFF;
				padding: 12upx 24upx 10upx;
				color: #666;
				font-size: 12upx;

				.spec {
					line-height: 34upx;
				}

				.price {
					margin-top: 10upx;
					line-height: 34upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

				}
			}
		}
	}

	.product-total {
		margin-top: 104upx;
		background: #FFFFFF;
		border: 0 solid #DDDDDD;
		font-size: 34upx;
		color: #444444;
		padding: 24upx 32upx 26upx;
		line-height: 48upx;

		&>text {
			padding-left: 40upx;
			font-size: 26upx;
		}
	}

	.red {
		color: #EE6060;
	}
</style>
