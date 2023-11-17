<template>
	<view class="item">
		<view class="left">
			<view class="price">
				<text>￥</text>
				<text>{{ content.amount }}</text>
			</view>
			<view class="man">
				<text>满</text>
				<text>{{ content.cill }}</text>
				<text>元可用</text>
			</view>
		</view>
		
		<view class="center">
			<view class="manjian">
				<text>满</text>
				<text>{{ content.cill }}</text>
				<text>减</text>
				<text>{{ content.amount }}</text>
			</view>
			<view class="time">
				<text>有效期至</text>
				<text>{{ content.expiration }}</text>
			</view>
			<view class="tip">
				<text>支持线上线下门店使用</text>
				<van-icon name="arrow-down" />
			</view>
		</view>
		
		<view class="right">
			<button type="default" class="btn" @click="getCoupon(content.id)">领取</button>
		</view>
		
		<view class="common">
			通用券
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { addCouponApi, getReceiveApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const LoginStore = useLoginStore()
	
	const props = defineProps(['content'])
	
	const getCoupon = async (val) => {
		const { data:res } = await addCouponApi({
			openid: LoginStore.keyInfo.openid,
			code: val
		})
		// 刷新优惠券
		const { data:res2 } = await getReceiveApi(LoginStore.keyInfo.openid)
		LoginStore.refreshReceive(res2.data)
	}
	
</script>

<style lang="scss" scoped>
	.item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		overflow: hidden;
		.left {
			display: flex;
			flex-direction: column;
			align-items: center;
			.price {
				color: #97642d;
				font-size: 50rpx;
				font-weight: bold;
				margin-bottom: 15rpx;
			}
			.man {
				font-size: 20rpx;
				color: #8d8d8d;
			}
		}
		.center {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #8d8d8d;
			align-items: flex-start;
			.manjian {
				color: #000;
				font-size: 32rpx;
				font-weight: bold;
			}
			.time {
				margin: 18rpx 0;
			}
		}
		.right {
			.btn {
				background-color: #97642d;
				color: #fff;
				border-radius: 15rpx;
				font-size: 24rpx;
				padding: 2rpx 30rpx;
			}
		}
		
		.common {
			position: absolute;
			background-color: #97642d;
			color: #fff;
			top: 0;
			left: 0;
			border-bottom-right-radius: 15rpx;
			padding: 4rpx 10rpx;
			font-size: 20rpx;
		}
	}
</style>