<template>
	<view>
		<mpvue-picker ref="mpvueTimePicker" :pickerValueDefault="timeIndex" mode='selector' @onConfirm="onTimeConfirm"
		 :pickerValueArray="timeArray"></mpvue-picker>
		<mpvue-picker ref="mpvueStatusPicker" :pickerValueDefault="statusIndex" mode='selector' @onConfirm="onStastuConfirm"
		 :pickerValueArray="statusArray"></mpvue-picker>
		<view class="transaction-selection">
			<view class="time" @tap="showPicker('time')">
				<text>{{timeArray[timeIndex[0]].label}}</text>
				<view class="arrow-big"></view>
				<view class="arrow-small"></view>
			</view>
			<view class="line"></view>
			<view class="status" @tap="showPicker('status')">
				<text>{{statusArray[statusIndex[0]].label}}</text>
				<view class="arrow-big"></view>
				<view class="arrow-small"></view>
			</view>
		</view>
		<view class="transaction-list">
			<view class="transaction-list-item" v-for="(item, index) in list" :key="index">
				<navigator class="navigator" :url="'/pages/online-record/info?saleOrder='+item.saleOrderNum" hover-class="navigator-hover">
					<view class="item-start">
						<view>{{item.day}}</view>
						<view class="month">{{item.month}}</view>
					</view>
					<view class="item-middle">
						<view>{{item.saleOrderNum}}</view>
						<view class="status" :style="item.paymentStatus == 1?'color: #6BC892;':''">{{item.paymentStatusType}}</view>
					</view>
					<view class="item-end">
						<view class="money">{{item.money}}</view>
						<view>{{item.time}}</view>
						<view class="arrow-big"></view>
						<view class="arrow-small"></view>
					</view>
				</navigator>
			</view>
		</view>
		<uni-load-more :status="loading"></uni-load-more>
	</view>
</template>

<script>
	import {
		formatTime,
		formatSubtractTime
	} from '@/common/libs/util/time.js'
	import {
		getArrValue
	} from "@/common/libs/util/index.js"
	import {
		getSaleOrderList
	} from '@/common/api/saleOrder/index.js';
	import mpvuePicker from "@/components/mpvue-picker/mpvue-picker.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				timeArray: [{
					label: '当日',
					value: 0
				}, {
					label: '最近7天',
					value: 7
				}, {
					label: '最近30天',
					value: 30
				}],
				statusArray: [{
					label: '全部',
					value: -1
				}, {
					label: '待支付',
					value: 0
				}, {
					label: '已扫码，待支付',
					value: 2
				}, {
					label: '已支付',
					value: 1
				}],
				timeIndex: [0],
				statusIndex: [0],
				list: [],
				// 是否在搜索
				isSearch: false,
				// more 加载更过 loading 加载中 noMore 没有更多
				loading: 'more',
				paymentStatusList: [{
						key: 0,
						value: '待支付'
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
				params: {
					orderNumber: '',
					customerName: '',
					state: -1,
					tradeMode: -1,
					paymentStatus: -1,
					orderSource: -1,
					salesman: -1,
					companyId: '',
					pageSize: 10,
					pageNum: 1,
					total: 0,
					auditState: -1,
					logisticsSheet: -1,
					printing: -1,
					stateTime: 1,
					sTime: formatTime(),
					eTime: formatTime(),
					// 订单列表
					type: 1
				},
				// 弹窗属性
				modal: {
					show: false,
					content: ''
				}
			}
		},
		components: {
			uniLoadMore,
			mpvuePicker
		},
		computed: {},
		onLoad() {
			console.log('onload');
			// this.list = [];
			this.params.pageNum = 1;
			this.getList();
		},
		onReachBottom() {
			console.log('onbuttom');
			this.getList();
		},
		methods: {
			// 时间切换
			onTimeConfirm(e) {
				this.timeIndex = e.index;
				this.params.sTime = formatSubtractTime(e.value[0]);
				this.params.pageNum = 1;
				this.list = [];
				this.isSearch = false;
				this.getList();
			},
			// 状态切换
			onStastuConfirm(e) {
				this.statusIndex = e.index;
				this.params.paymentStatus = e.value[0];
				this.params.pageNum = 1;
				this.list = [];
				this.isSearch = false;
				this.getList();
			},
			showPicker(type) {
				if (type == 'time') {
					this.$refs.mpvueTimePicker.show();
				} else {
					this.$refs.mpvueStatusPicker.show();
				}

			},
			getList() {
				let params = {
					...this.params
				}
				// 在搜索中不再执行
				if (this.isSearch) {
					return;
				}
				if (this.list.length == this.params.total && this.list.length != 0) {
					return;
				}
				this.loading = 'loading';
				this.isSearch = true;
				getSaleOrderList(params).then(res => {
					this.isSearch = false;
					if (res.status != 200) {
						this.loading = 'noMore'
						uni.showModal({ title: '提示', content: res.msg, showCancel:false });
						return;
					}
					this.params.pageNum = this.params.pageNum + 1;
					this.params.total = res.data.total || 0;
					let list = res.data.list || [];
					list.forEach(item => {
						item.month = formatTime(item.createdAt, "MM月");
						item.day = formatTime(item.createdAt, "DD");
						item.time = formatTime(item.createdAt, "HH:mm:SS");
						if (item.money) {
							item.money = '￥' + item.money;
						}
						item.paymentStatusType = getArrValue(this.paymentStatusList, item.paymentStatus);
						this.list.push(item);
					})
					if (res.data.total == 0 || res.data.total == this.list.length) {
						this.loading = 'noMore'
					} else {
						this.loading = 'more'
					}
				}).catch(error => {
					this.isSearch = false;
					this.loading = 'noMore';
					if (error.status == 403) {
						uni.showModal({ title: '提示', content: error.msg, showCancel:false });
						return;
					}
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

	.transaction-selection {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		background: #fff;

		& .line {
			width: 2upx;
			height: 40upx;
			background: #ccc;
		}

		& .time,
		& .status {
			width: 374upx;
			padding: 20upx 0;
			font-size: 28upx;
			color: #444;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			& .arrow-big {
				width: 0;
				height: 0;
				border-width: 12upx;
				border-style: solid;
				border-color: #979797 transparent transparent transparent;
				position: absolute;
				top: 30upx;
				right: 40upx;
			}

			& .arrow-small {
				width: 0;
				height: 0;
				border-width: 10upx;
				border-style: solid;
				border-color: #fff transparent transparent transparent;
				position: absolute;
				top: 30upx;
				right: 42upx;
			}
		}
	}

	.transaction-list {
		background: #fff;
		border-top: 10upx solid #f4f4f4;
		&-item {
			border-bottom: 5upx solid #f4f4f4;

			& .navigator {
				padding: 24px 0;
				display: block;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex: 1;
			}
		}
	}

	.item-start {
		width: 120upx;
		text-align: center;
		font-size: 40upx;
		color: #666;

		& .month {
			font-size: 24upx;
			color: #999;
		}
	}

	.item-middle {
		width: 380upx;
		font-size: 26upx;
		color: #444;

		.status {
			margin-top: 12upx;
			font-size: 24upx;
			color: #FC8351;
		}
	}

	.item-end {
		width: 250upx;
		font-size: 24upx;
		color: #BBBBBB;
		padding-right: 100upx;
		text-align: right;
		position: relative;

		& .money {
			margin-bottom: 8upx;
			font-size: 28upx;
			color: #EE6060;
		}

		& .arrow-big {
			width: 0;
			height: 0;
			border-width: 12upx;
			border-style: solid;
			border-color: transparent transparent transparent #979797;
			position: absolute;
			top: 32upx;
			right: 38upx;
		}

		& .arrow-small {
			width: 0;
			height: 0;
			border-width: 10upx;
			border-style: solid;
			border-color: transparent transparent transparent #fff;
			position: absolute;
			top: 34upx;
			right: 42upx;
		}
	}
</style>
