<template>
	<view class="layout">
		<view v-for="(el,index) in companyList" :key="index" @click="switchLogin(el.memberId)" class="company-item">{{el.companyName}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyList:[]
			};
		},
		mounted(){
			this.getCompanyList()
		},
		methods:{
			getCompanyList(){
				this.companyList =[   
					{
					  "companyName": "浙江企顺管业科技有限公司",
					  "id": 36872,
					  "marketName": "",
					  "memberId": "qsgykj"
					},
					{
					  "companyName": "浙江企顺管业科技有限公司",
					  "id": 36872,
					  "marketName": "",
					  "memberId": "qsgykj"
					}
				]
// 				uni.request({
// 					url:'/login/getCompanyList',
// 					success:(res)=>{
// 						if(res.status !== 200){
// 							return
// 						}
// 						this.companyList = res.data
// 					}
// 				})
			},
			switchLogin(memberId){
				uni.request({
					url:'/login/choose/company/login',
					data:{ memberId },
					success:(res) =>{
						
					}
				})
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
