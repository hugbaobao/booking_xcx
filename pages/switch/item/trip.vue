<template>
	<view class="trip">
		<view class="png">
			<image :src="pngList?.tripone" mode="" class="img"></image>
			<view class="abs">
				<van-icon name="ellipsis" />
				<text>推荐行程</text>
				<van-icon name="ellipsis" />
			</view>
		</view>
		<view class="list">
			<my-trip :datalist="shoplist"></my-trip>
		</view>
		
		<view class="png">
			<image :src="pngList?.triptwo" mode="" class="img"></image>
			<view class="abs">
				<van-icon name="ellipsis" />
				<text>旅行攻略</text>
				<van-icon name="ellipsis" />
			</view>
		</view>
		<view class="list">
			<my-article></my-article>
		</view>
		
		<view class="fix" @click="toAdd">
			<van-icon name="plus" />
			<text class="word">创建我的攻略</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import MyTrip from '@/components/list/switch/trip/trip.vue'
	import MyArticle from '@/components/list/switch/trip/article.vue'
	import { getPngApi, getByTypeApi } from '@/http/getinfo.js'
	
	const pngList = ref()
	const shoplist = ref([])
	const toAdd = () => {
		uni.navigateTo({
			url:'/pages/switch/item/addtrip'
		})
	}
	
	// API
	const getInfo = async () => {
		const { data:res } = await getPngApi()
		pngList.value = res.data[0]
	}
	const shoptype = async () => {
		const {data:res} = await getByTypeApi(5)
		shoplist.value = res.data.map(item=>{
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
	}
	
	onMounted(()=>{
		getInfo()
		shoptype()
	})
	
</script>

<style lang="scss" scoped>
	.trip {
		min-height: 100vh;
		padding-bottom: 100rpx;
		.png {
			position: relative;
			.img {
				width: 750rpx;
				height: 180rpx;
				background-color: skyblue;
			}
			.abs {
				width: 750rpx;
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #e5c597;
			}
		}
		.list {
			padding: 20rpx;
		}
		
		.fix {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			background-color: $btn1;
			font-weight: bold;
			font-size: 36rpx;
			.word {
				margin-left: 15rpx;
			}
		}
	}
</style>