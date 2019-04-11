<template>
	<view class="layout">
		<image class="logo" :src="logo_dasheng"></image>
		<text class="title">欢迎登录大昇收银台</text>
		<view class="login-form">
			<view class="login-form-input flex-layout">
				<input v-model="formParams.phone" type="number" focus="true" placeholder="手机号" />
				<view @click="getVerificationSend" class="getCode">{{time>=120?'获取验证码':time+'秒后可重新获取'}}</view>
			</view>
			<view class="login-form-input">
				<input v-model="formParams.verification" type="number" placeholder="验证码" />
			</view>
			<button @click="login" class="login-form-submit">登录</button>
		</view>
		<neil-modal :show="modal.show" title="提示" :content="modal.content" :auto-close="false" :show-cancel="false" @confirm="modal.show = !modal.show">
		</neil-modal>
	</view>
</template>
<script>
	import api from "@/common/libs/api.request.js";
	import { verificationSend } from '@/common/api/verification/index.js';
	import { verification,appletAuthBinding } from '@/common/api/login/index.js';
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	export default {
		components: {
			neilModal
		},
		mounted() {},
		data() {
			return {
				timer: null,
				time: 120,
				modal: {
					show: false,
					content: ''
				},
				formParams: {
					phone: '',
					verification: ''
				}
			};
		},
		computed: {
			logo_dasheng: function() {
				return this.$CDN('icon_logo.png');
				// return 'http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image/icon_warning_min.png'
			}
		},
		methods: {
			async getVerificationSend() {
				// 验证码计时时间内不可操作
				if (this.time < 120) return
				// 验证参数
				let ispass = /^1\d{10}$/.test(this.formParams.phone)
				if (!ispass) {
					this.modal.content = '请输入正确的手机号'
					this.modal.show = true;
					return;
				}
				// 验证码计时器
				this.timer = setInterval(() => {
					this.time--;
					if (this.time <= 0) {
						clearInterval(this.timer);
						this.time = 120
					}
				}, 1000);
				let res = await verificationSend({ check: 'login', phone: this.formParams.phone });
				res = res.data;
				
				if(res.status == 403) {
					this.modal.show = true
					this.modal.content = res.msg
				}
				if (res.status !== 200) return;
			},
			async login() {
				// 验证参数
				let phoneNotPass = /^1\d{10}$/.test(this.formParams.phone)
				if (!phoneNotPass) {
					this.modal.content = '请输入正确的手机号'
					this.modal.show = true;
					return;
				}
				if(!this.verification){
					this.modal.content = '验证码'
					this.modal.show = true
					return;
				}
				let res = await verification(this.formParams);
				res = res.data;
				if(res.status == 403) {
					this.modal.show = true
					this.modal.content = res.msg
				}
				if (res.status !== 200) return
				// #ifdef MP-ALIPAY
					my.getAuthCode({
					  scopes: 'auth_base',
					  success: (res) => {
						this.binding({
							phone: this.formParams.phone,
							verification: this.formParams.verification,
							alipayAppletAuthId:res.authCode
						})
					  },
					});
				// #endif
				// 只有一家客户
				if(res.data.memberId){
					uni.setStorage({
						key: 'userInfo',
						data: res.data,
						success: (res) => {
							console.log(res, '存储成功')
						}
					})
					uni.redirectTo({ url: '/pages/create-order/create-order' })
				}
				// 如果有多家公司购买了ERP,跳转选择公司页面
				if (!res.data.memberId) {
					uni.redirectTo({
						url: '/pages/switch-company/switch-company'
					})
					return;
				}
			},
			async binding(phone,verification,alipayAppletAuthId){
				let res = await appletAuthBinding(phone,verification,alipayAppletAuthId);
				if(res.status == 403) {
					this.modal.show = true
					this.modal.content = res.msg
				}
			}
		}
	}
</script>

<style lang="less">
	page,{
		min-height: 100vh;
		background: #fff;
	}
	.layout {
		min-height:92vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: PingFangSC-Heavy;
	}

	.logo {
		width: 100upx;
		height: 100upx;
		margin-top: 60upx;
		margin-bottom: 30upx;
	}

	.title {
		font-size: 14px;
		color: #4C4C4C;
	}

	.login-form {
		margin-top: 90upx;
		width: 600upx;
	}

	.flex-layout {
		display: flex;
	}

	.getCode {
		margin-right: auto;
		height: 100upx;
		line-height: 100upx;
		font-size: 12px;
		color: #218FFF;
	}

	.login-form-input {
		background: #fff;
		border-bottom: solid #ECECEC 1upx;

		input {
			flex: 1;
			height: 100upx;
			padding-left: 3upx;
			font-size: 15px;
			color: #444;
		}
	}

	.login-form-submit {
		margin-top: 60upx;
		height: 72upx;
		line-height: 72upx;
		background: #218FFF;
		border-radius: 3upx;
		color: #fff;
	}
</style>
