<template>
	<view class="vip">
		<view class="header">
			<view class="card">
				<view class="top">
					<text class="tip">会员</text>
					<text v-if="!LoginStore.userMsg.vip">开通会员激活等级特权</text>
				</view>
				
				<view class="btm">
					<text v-if="!LoginStore.userMsg.vip">暂未开通会员</text>
					<text v-else>VIP等级 <text class="vip">{{ parseInt(LoginStore.userMsg.integral / 1000) + 1 }}</text></text>
				</view>
				
				<view class="receive" v-if="!LoginStore.userMsg.vip">
					待领卡
				</view>
				
				<view class="icon">
					<van-icon name="medal" color="#b8cce2" size="180rpx" />
				</view>
			</view>
		</view>
		
		<!-- <view class="phone">
			<view class="tel">
				<view class="line1">
					<text class="bold">完善开卡资料</text>
					<text>获得更好的会员服务</text>
				</view>
				<view class="line2">
					<u-field
						v-model="mobile"
						label="手机号"
						placeholder="请填写手机号"
					>
					</u-field>
					<u-field
						v-model="code"
						label="验证码"
						placeholder="请填写验证码"
					>
						<template v-slot:right>
							<u-button size="mini" type="success" @click="getCode">{{codeText}}</u-button>
						</template>
					</u-field>
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				</view>
			</view>
		</view> -->
		
		<view class="btn" v-if="!LoginStore.userMsg.vip">
			<view class="inner" @click="tobeVip">
				立即领取
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
	import { changeVipApi } from '@/http/getinfo.js'
	
	const LoginStore = useLoginStore()  // 是否领卡
	const utoast =ref()
	const tobeVip = async () => {
		const { data:res } = await changeVipApi(LoginStore.keyInfo.openid)
		if(res.code === 200) {
			utoast.value.show({
				title: '领取成功！',
				type: 'success',
				icon: false
			})
		}
	}
	
	// const mobile = ref('')
	// const code = ref('')
	// const codeText = ref('')
	
	// const uCode = ref()
	
	// const codeChange = (text) => {
	// 	codeText.value = text;
	// }
	
	// const getCode = () => {
	// 	if(uCode.value.canGetCode) {
	// 		// 模拟向后端请求验证码
	// 		uni.showLoading({
	// 			title: '正在获取验证码'
	// 		})
	// 		setTimeout(() => {
	// 			uni.hideLoading();
	// 			// 通知验证码组件内部开始倒计时
	// 			uCode.value.start();
	// 		}, 1000);
	// 	}else {
	// 		this.$u.toast('倒计时结束后再发送');
	// 	}
	// }
</script>

<style lang="scss" scoped>
	.vip {
		min-height: 100vh;
		background-color: #f2f2f2;
		.header{
			width: 100%;
			background: linear-gradient(to right, #323b44, #445463, #323b44);
			padding: 40rpx 20rpx;
			.card {
				background: linear-gradient(to right top, #cbe8fa, #93bbdf);
				border-radius: 20rpx;
				padding: 40rpx 20rpx;
				font-size: 24rpx;
				position: relative;
				overflow: hidden;
				.top{
					color: #394f6f;
					border-bottom: 1px solid #b7d6ea;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: 20rpx 0 30rpx;
					margin-bottom: 30rpx;
					.tip {
						font-size: 40rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}
				}
				
				.btm{
					color: #66808e;
					.vip {
						font-weight: bold;
						color: #fba763;
						background-color: transparent;
					}
				}
				
				.receive {
					position: absolute;
					background-color: #98adba;
					color: #fff;
					top: 0;
					left: 0;
					border-bottom-right-radius: 15rpx;
					padding: 4rpx 10rpx;
					font-size: 20rpx;
				}
				
				.icon{
					position: absolute;
					top: -20rpx;
					right: 40rpx;
					display: flex;
					align-items: flex-start;
				}
			}
		}
		
		.phone {
			margin-top: 20rpx;
			padding: 0 20rpx;
			.tel{
				background-color: #fff;
				border-radius: 20rpx;
				padding: 30rpx 20rpx;
				.line1 {
					padding: 0 32rpx;
					color: #c2c2c2;
					font-size: 24rpx;
					.bold {
						color: #000;
						margin-right: 30rpx;
						font-size: 28rpx;
					}
				}
				.line2{
				}
			}
		}
		
		.btn {
			position: fixed;
			width: 100%;
			bottom: 50rpx;
			left: 0;
			padding: 20rpx;
			.inner{
				background-color: #ffcb91;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 10rpx;
				text-align: center;
				font-weight: bold;
			}
		}
	}
</style>