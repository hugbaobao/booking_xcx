<template>
	<view class="switch">
		<view class="item" v-for="(item, index) in list" :key="index" @click="navTo(item.page)">
			<view class="content">
				<image :src="item.url" mode="" class="img"></image>
				<view class="font">{{ item.name }}</view>
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	
	const utoast =ref()
	const props = defineProps({
		list: {
			
		}
	})

    const navTo = (val) => {
		if(val !== '') {
			uni.navigateTo({
				url: val,
				fail() {
					uni.switchTab({
						url: val
					})
				}
			})
		} else {
			utoast.value.show({
				title: '暂未开放，敬请期待！',
				type: 'warning',
				icon: false
			})
		}
	}
</script>

<style lang="scss" scoped>
	.switch {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 33%;
			margin-bottom: 20rpx;
			.content {
				margin: 0 auto;
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.img {
					width: 120rpx;
					height: 120rpx;
					margin-bottom: 6rpx;
					border-radius: 20rpx;
				}
			}
			
		}
	}
</style>