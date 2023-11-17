<template>
	<view class="wallet">
		<view class="show">
			<view class="item">
				<text>店铺余额（元）</text>
				<view class="num">
					0.00
				</view>
			</view>
			<view class="item">
				<text>本金（元）</text>
				<view class="num">
					0.00
				</view>
			</view>
			<view class="item">
				<text>赠金（元）</text>
				<view class="num">
					0.00
				</view>
			</view>
		</view>
		
		<view class="detail">
			余额明细
		</view>
		
		<view class="list">
			<view class="ul" v-if="history.length >= 1">
				<view class="li">
					<view class="avator">
						<image src="../../static/picture/img.png" mode="widthFix" class="img"></image>
					</view>
					<view class="words">
						<view class="title">
							商品名称
						</view>
						<view class="flex">
							<text class="time">9月21日 17:00</text>
							<view class="half">
								<view class="left">
								<text>本金</text><text>-</text><text>80.00</text>
								</view>
								<view class="left">
								<text>赠金</text><text>-</text><text>20.00</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="empty" v-else>
				<van-empty description="还没有记录~" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const history = ref([])

</script>

<style lang="scss" scoped>
	.wallet {
		.show{
			background: linear-gradient(to right, #fef3d3, #fef7ec);
			padding: 70rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				.num {
					font-weight: bold;
					font-size: 32rpx;
					margin-top: 10rpx;
				}
			}
		}
		
		.detail{
			background-color: #fff;
			padding: 30rpx 20rpx;
			box-shadow: 0 20rpx 20rpx rgba(253, 252, 250, .8);
			margin-bottom: 20rpx;
		}
		
		.ul {
			padding: 10rpx 20rpx;
			.li {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #d5d5d5;
				padding-bottom: 10rpx;
				.avator {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					overflow: hidden;
					margin-right: 30rpx;
					.img {
						width: 100%;
					}
				}
				.words {
					display: flex;
					flex-direction: column;
					flex: 1;
					.title {
						font-weight: bold;
						font-size: 32rpx;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.flex {
						flex: 1;
						color: #bfbfbf;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.time {
							margin-right: 50rpx;
						}
						.half {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.left {
								display: flex;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}
</style>