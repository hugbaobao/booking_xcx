<template>
	<view class="keeper">
		<my-title>
			<template #default>
			  在线管家服务
			</template>
			
			<template #thin>
			  一键呼叫，极速完成
			</template>
		</my-title>
		
		<view class="box">
			<button open-type="contact" class="half block" style="line-height: 1;">
				<view class="icon iconfont">&#xe745;</view>
				<text class="words">开发票</text>
			</button>
			<view class="half block" @click="tobuy">
				<view class="icon iconfont">&#xe600;</view>
				<text class="words">便利店</text>
			</view>
			<button open-type="contact" class="half block" style="line-height: 1;">
				<view class="icon iconfont">&#xe62c;</view>
				<text class="words">客房送物</text>
			</button>
			<button open-type="contact" class="half block" style="line-height: 1;">
				<view class="icon iconfont">&#xed17;</view>
				<text class="words">呼叫打扫</text>
			</button>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import MyTitle from './title.vue'
	import { ref } from 'vue'
	
	const utoast =ref()
	
	const tobuy = () => {
		utoast.value.show({
			title: '暂未开放，敬请期待！',
			type: 'warning',
			icon: false
		})
	}
</script>

<style lang="scss" scoped>
	.keeper {
		.box{
			display: flex;
			text-align: center;
			margin-top: 20rpx;
			.half {
				flex: 1;
				margin-right: 20rpx;
				&:last-child {
					margin-right: 0;
				}
			}
			.block {
				background-color: #fff;
				border-radius: 20rpx;
				color: #b2b6b8;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 30rpx 0;
				.words {
					margin-top: 20rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>