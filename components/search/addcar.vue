<template>
	<view class="part">
		<view class="pic">
			<view class="png">
				<image :src="goods?.cover[0]" mode="widthFix" class="img">
				</image>
			</view>
						
			<view class="right">
				<view class="words">
					<view class="name">
						<text class="title">{{ goods?.name }}</text>
						<text class="font">{{ goods?.words }}</text>
					</view>
				</view>
				<view class="between">
					<text class="price">￥{{ parseFloat(goods?.price) }}</text>
					<view class="num" @click="addCar(goods?.id)">
						<van-icon name="cart-o" size="40rpx" color="#f29100" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const props = defineProps({
		goods:{
			type: Object
		}
	})
	
	const addCar = () => {
		uni.navigateTo({
			url:'/pages/order/car'
		})
	}

</script>

<style lang="scss" scoped>
	.part{
		background-color: #fff;
		margin-bottom: 20rpx;
		.pic {
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;
			box-shadow: 0px 10rpx 20rpx rgba(0, 0, 0, 0.2);
			.png {
				width: 180rpx;
				height: 200rpx;
				background-color: #f1f1f1;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				.img {
					width: 70%;
					height: 100rpx;
				}
			}
			.right {
				height: 200rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.words {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						.font{
							color: #646566;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
				}
				.between {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.price {
						
					}
					.num {
						font-size: 22rpx;
						color: #969799;
					}
				}
			}
		}
		
		.handle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 30rpx;
			.btn {
				width: 160rpx;
				border: 1px solid #c4c5c7;
				background-color: #fff;
				height: 60rpx;
				// line-height: 60rpx;
				border-radius: 30rpx;
				margin: 0;
				padding: 0;
				&::after{
					border: none;
				}
			}
		}
	}
</style>