<template>
	<view class="li" v-for="li in getlist" :key="li.id">
		<view class="left">
			<text class="top">{{ li.name }}</text>
			<text>{{ li.creattime }}</text>
		</view>
		<view class="num">
			<text>{{ li.type === 0 ? '+' : '-' }} </text>
			<text>{{ li.count }}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	
	const props = defineProps({
		getlist:{
			type: Array
		}
	})

</script>

<style lang="scss" scoped>
	.li {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 30rpx;
		.left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.top {
				color: #000;
				margin-bottom: 15rpx;
			}
		}
		.num {
			color: #000;
			font-weight: bold;
			font-size: 36rpx;
		}
	}
</style>