<template>
	<view class="order">
		<view class="flex">
			<view class="item" @click="navTo('/pages/order/car')">
				<van-icon name="balance-pay" size="50rpx" />
				<text class="font">购物车</text>
			</view>
			<view class="item" @click="navTo('/pages/personal/coupon')">
				<van-icon name="send-gift-o" size="50rpx" />
				<text class="font">领券中心</text>
			</view>
			<view class="item" @click="navTo('/pages/personal/mycoupon')">
				<van-icon name="logistics" size="50rpx" />
				<text class="font">我的优惠券</text>
			</view>
			<view class="item" @click="notOpen">
				<van-icon name="comment-o" size="50rpx" />
				<text class="font">我的活动</text>
			</view>
			<view class="item" @click="navTo('/pages/personal/wallet')">
				<van-icon name="cash-back-record" size="50rpx" />
				<text class="font">我的余额</text>
			</view>
			<view class="item" @click="notOpen">
				<van-icon name="balance-pay" size="50rpx" />
				<text class="font">签到有礼</text>
			</view>
			<view class="item" @click="navTo('/pages/personal/vip')">
				<van-icon name="send-gift-o" size="50rpx" />
				<text class="font">会员中心</text>
			</view>
			<view class="item" @click="navTo('/pages/personal/jifen')">
				<van-icon name="logistics" size="50rpx" />
				<text class="font">我的积分</text>
			</view>
			<view class="item" @click="notOpen">
				<van-icon name="comment-o" size="50rpx" />
				<text class="font">权益会员中心</text>
			</view>
			<view class="item" @click="notOpen">
				<van-icon name="cash-back-record" size="50rpx" />
				<text class="font">分销中心</text>
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	
	const utoast =ref()
	
	const navTo = (val) => {
		uni.navigateTo({
			url: val
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
	.order {
		padding: 30rpx 30rpx 0;
		background-color: #fff;
		margin-top: 20rpx;
		
		.flex {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 60rpx;
				.font {
					margin-top: 15rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>