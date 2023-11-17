<template>
	<view class="timepicker">
		
		<view class="left">
			<view class="avatar" @click="eidtInfo">
				<image :src="src" mode="" class="png"></image>
			</view>
			
			<view class="others">
				<view class="nick" @click="eidtInfo">
					{{ User.isLogin ? User.userMsg.name : '未登录' }}
				</view>
				<view class="show">
					<view class="half">
						普通用户
					</view>
					<view class="half" @click="notOpen">
						<van-icon name="qr" size="24rpx" />
						<text>客户码</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="right" @click="toOwn">
			<text class="count">{{Receive}}</text>
			<text>优惠券</text>
		</view>
		
	</view>
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
	
	const utoast =ref()
	const User = useLoginStore()
	const Receive = User.Receive.filter(item => item.used === 0  && new Date(item.Coupon.expiration) >= new Date().setHours(0, 0, 0, 0)).length
	
	const src = ref('http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg')
	
	const toOwn = () => {
		uni.navigateTo({
			url:'/pages/personal/mycoupon'
		})
	}
	const eidtInfo = () => {
		uni.navigateTo({
			url:'/pages/login/setmymsg'
		})
	}
	
	const notOpen = () => {
		utoast.value.show({
			title: '暂未开放，敬请期待！',
			type: 'warning',
			icon: false
		})
	}

</script>

<style lang="scss" scoped>
	.timepicker {
		// 从左下角到右上角的渐变色，由黄到粉
		background: linear-gradient(to right top, #f0f3fe, #eddaf2);
		
		padding: 250rpx 30rpx 30rpx;  // 这里后期由组件获取值后替换
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			.avatar {
				margin-right: 20rpx;
				.png {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					border: 1px solid #fff;
					background: linear-gradient(to right top, #f0f3fe, #eddaf2);
				}
			}
			
			.others {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				font-weight: bold;
				.nick {
					margin-bottom: 15rpx;
				}
				.show {
					display: flex;
					align-items: center;
					.half {
						background-color: #e5e3e5;
						line-height: 1;
						font-size: 24rpx;
						padding: 6rpx 10rpx;
						&:first-child {
							margin-right: 10rpx;
						}
						&:last-child {
							display: flex;
							align-items: center;
						}
					}
				}
			}
		}
		
		.right {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-weight: bold;
			font-size: 24rpx;
			.count {
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}
		}
		
	}
</style>