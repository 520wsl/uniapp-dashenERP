<template>
	<view class="layout">
        <image class="logo" src="/static/logo.png"></image>
		<text class="title">欢迎登录大昇收银台</text>
		<view class="login-form">
			<view class="login-form-input flex-layout">
				<input type="number" :value="phone" focus="true" placeholder="手机号"/>
				<view class="getCode">获取验证码</view>
			</view>
			<view class="login-form-input">
				<input type="number" :value="code" placeholder="验证码"/>
			</view>
			<button class="login-form-submit">登录</button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				code:''
			};
		}
	}
</script>

<style lang="less">
	// 支付宝似乎没有没有支持page(在支付宝下无效)
	page,.layout{
		min-height:100vh;
		background: #fff;
	}
	.layout{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: PingFangSC-Heavy;
	}
	.logo{
		width: 100upx;
		height: 100upx;
		margin-top: 60upx;
		margin-bottom: 30upx;
	}
	.title{
		font-size: 14px;
		color: #4C4C4C;
	}
	.login-form{
		margin-top:90upx;
		width:600upx;
	}
	.flex-layout{
		display: flex;
	}
	.getCode{
		margin-right:auto;
		height: 100upx;
		line-height: 100upx;
		font-size: 12px;
		color: #218FFF;
	}
	.login-form-input{
		background: #fff;
		border-bottom: solid #ECECEC 1upx;
		input{
			flex:1;
			height: 100upx;
			padding-left:3upx;
			font-size: 15px;
			color:#444;
		}
	}
	.login-form-submit{
		margin-top:60upx;
		height: 72upx;
		line-height: 72upx;
		background:#218FFF;
		border-radius: 3upx;
		color: #fff;
	}
</style>
