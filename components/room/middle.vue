<template>
	<view class="middle">
		<view class="line1">
			<view class="item">
				left
			</view>
			<view class="item">
				right
			</view>
		</view>
		
		<view class="flex">
			<view class="half">
				
			</view>
			<view class="right">
				<view class="item">
					1
				</view>
				<view class="item">
					2
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.middle {
		.line1 {
			display: flex;
			justify-content: center;
			align-items: center;
			
			.item {
				background-color: gray;
				border-radius: 10rpx;
				width: 40%;
				text-align: center;
				line-height: 2;
				&:first-child {
					margin-right: 40rpx;
				}
			}
		}
		
		.flex {
			display: flex;
			align-content: center;
			margin-top: 30rpx;
			.half {
				flex: 1;
				height: 300rpx;
				background-color: gray;
				margin-right: 30rpx;
			}
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				.item {
					flex: 1;
					width: 100%;
					background-color: gray;
					&:first-child {
						margin-bottom: 30rpx;
					}
				}
			}
		}
	}
</style>