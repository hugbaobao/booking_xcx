<template>
	<view class="hot">
        <image :src="cover" mode="" class="png"></image>
		
		<view class="more">
			<van-cell title="热销排行" is-link :border="false" @click="toMorePro" />
		</view>
		<view class="flex">
			<view class="item" v-for="item in goodsList" :key="item.id" @click="toGoodsDetail(item)">
				<image :src="item.cover[0]" mode="" class="png"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import * as API from '@/http/getinfo.js'
	import { useGoodsStore } from '@/stores/goods.js'
	
	const props = defineProps({
		cover: String
	})
	const goodsList = ref([])
	const goods = useGoodsStore()
	
	const toMorePro = () => {
		uni.navigateTo({
			url:'/pages/list/product?type=1'
		})
	}
	const toGoodsDetail = (val) => {
		goods.goodsChange(val)
		uni.navigateTo({
			url:'/pages/order/goodsdetail'
		})
	}
	
	// API
	const getInfo = async () => {
		const { data:res } = await API.getByTypeApi(1)
		goodsList.value = res.data.map(item=>{
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
	}
	
	onMounted(()=>{
		getInfo()
	})

</script>

<style lang="scss" scoped>
	.hot {
		.png {
			width: 100%;
			height: 200rpx;
			background-color: skyblue;
			border-radius: 20rpx;
		}
		.flex{
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			.item {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 30rpx;
				.png {
					width: 140rpx;
					height: 140rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>