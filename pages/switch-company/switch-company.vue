<template>
	<view class="layout">
		<view
			v-for="(el,index) in companyList"
			:key="index"
			@click="switchLogin(el.memberId)"
			class="company-item"
			:class="activeMemberId == el.memberId ?'company-item-active':''"
		>
			<image :src="icon_company" style="width: 45upx; height: 45upx;"></image>
			{{el.companyName}}
			<image :src="icon_success" style="width: 45upx; height: 45upx;"></image>
		</view>
	</view>
</template>

<script>
	import api from "@/common/libs/api.request.js";
	import { getCompanyList,chooseCompany } from '@/common/api/login/index.js';
	export default {
		data() {
			return {
				companyList:[],
				activeMemberId:''
			};
		},
		computed:{
			icon_company() {
				return this.$CDN('icon_company.png');
			},
			icon_success() {
				return this.$CDN('icon_success.png');
			}
		},
		mounted(){
			this.getCompanyListAction()
		},
		methods:{
			getCompanyListAction(){
				getCompanyList()
					.then((res)=>{
						if(res.status !== 200) return;
						// 设置选中店铺
						uni.getStorage({
							key:'userInfo',
							success:(res)=>{
								this.activeMemberId = res.data.memberId
							}
						})
						this.companyList = res.data;
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
	page{
		height: 100%;
	}
	.layout{
		height: 100%;
		/* #ifdef MP-ALIPAY || MP-WEIXIN */
			min-height: 100vh;
		/* #endif */
		font-family: PingFangSC-Semibold;
	}
	.company-item{
		display:flex;
		justify-content:center;
		align-items:center;
		height: 120upx;
		border-bottom: 2upx solid  #F4F4F4;
		font-size: 26upx;
		color: #666;
		letter-spacing: -0.31px;
		image{
			display:none
		}
	}
	.company-item-active{
		color: #218FFF;
		image{
			display: block;
			margin:0 45upx;
		}
	}
	
</style>
