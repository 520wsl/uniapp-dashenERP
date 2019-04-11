<template>
	<view class="layout">
		<view v-for="(el,index) in companyList" :key="index" @click="switchLogin(el.memberId)" class="company-item">{{el.companyName}}</view>
		<neil-modal :show="modal.show" title="提示" :content="modal.content" :auto-close="false" :show-cancel="false" @confirm="modal.show = !modal.show">
		</neil-modal>
	</view>
</template>

<script>
	import api from "@/common/libs/api.request.js";
	import { getCompanyList,chooseCompany } from '@/common/api/login/index.js';
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	export default {
		data() {
			return {
				companyList:[]
			};
		},
		mounted(){
			this.getCompanyListAction()
		},
		methods:{
			async getCompanyListAction(){
				let res = await getCompanyList({})
				if(res.data.status !== 200) return;
				res = res.data;
				if(res.status == 403) {
					this.modal.show = true
					this.modal.content = res.msg
				}
				this.companyList = res.data
			},
			async switchLogin(memberId){
				let res = await chooseCompany({memberId})
				res = res.data;
				if(res.status == 403) {
					this.modal.show = true
					this.modal.content = res.msg
				}
				if(res.status !== 200) return;
				uni.setStorage({
					key: 'userInfo',
					data: res.data,
					success: (res) => {
						console.log(res, '存储成功')
					}
				})
				uni.redirectTo({ url: '/pages/create-order/create-order' })
			}
		}
	}
</script>

<style lang="less" scoped>
	page,.layout{
		min-height:100vh;
		background: #fff;
		font-family: PingFangSC-Semibold;
	}
	.company-item{
		height: 120upx;
		line-height: 120upx;
		border-bottom: 1px solid  #F4F4F4;
		text-align: center;
		font-size: 13px;
		color: #666666;
		/* letter-spacing: -0.31px; */
	}
</style>
