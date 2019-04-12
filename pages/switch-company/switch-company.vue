<template>
	<view class="layout">
		<view v-for="(el,index) in companyList" :key="index" @click="switchLogin(el.memberId)" class="company-item">
			{{el.companyName}}
		</view>
	</view>
</template>

<script>
	import api from "@/common/libs/api.request.js";
	import { getCompanyList,chooseCompany } from '@/common/api/login/index.js';
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
			getCompanyListAction(){
				getCompanyList()
					.then((res)=>{
						if(res.status !== 200) return;
						this.companyList = res.data
					})
					.catch((err)=>{
						if(err.status == 403) {
							uni.showModal({ title: '提示', content: err.msg, showCancel:false });
						}
					})
			},
			switchLogin(memberId){
				chooseCompany({memberId})
					.then(res=>{
						if(res.status !== 200) return;
						uni.setStorage({
							key: 'userInfo',
							data: res.data,
							success: (res) => {
								console.log(res, '存储成功')
							}
						})
						uni.redirectTo({ url: '/pages/create-order/create-order' })
					})
					.catch(err=>{
						if(err.status == 403) {
							uni.showModal({ title: '提示', content: err.msg, showCancel:false });
						}
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.layout{
		height: 100vh;
		font-family: PingFangSC-Semibold;
	}
	.company-item{
		height: 120upx;
		line-height: 120upx;
		border-bottom: 2upx solid  #F4F4F4;
		text-align: center;
		font-size: 26upx;
		color: #218FFF;
		/* letter-spacing: -0.31px; */
	}
</style>
