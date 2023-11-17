<template>
	<view class="home">
		<view class="mynavgation">
			<my-navgation></my-navgation>
		</view>
		
		<view class="header" v-if="Maininfo.clocktop">
			<my-swiper :list="Object.values(Maininfo.bannertop)"></my-swiper>
		</view>
		
		<view class="myswitch">
			<my-switch :list="Maininfo.switch"></my-switch>
		</view>
		
		<view class="myantswiper" v-if="Maininfo.clockbtm">
			<my-ant-swiper :list="Maininfo.bannerbtm"></my-ant-swiper>
		</view>
		
		<view class="mysort">
			<my-sort :cover="Maininfo.coverone?.url" :list="listone"></my-sort>
		</view>
		
		<view class="mysort">
			<my-sort :cover="Maininfo.covertwo?.url" :list="listtwo"></my-sort>
		</view>
	</view>
</template>

<script setup>
	import MyNavgation from '@/components/navgation/home.vue'
	import MySwiper from '@/components/home/swiper.vue'
	import MySwitch from '@/components/home/switch.vue'
	import MyAntSwiper from '@/components/home/antswiper.vue'
	import MySort from '@/components/home/sort.vue'
	import navdata from '@/hooks/getNav.js'
	import * as API from '@/http/getinfo.js'
	import { onMounted, ref, getCurrentInstance } from 'vue'
	
	let fullH = `${navdata.fullH + 5}px` // 整体高度
	
	const Maininfo = ref([]) // 上轮播图
	const listone = ref([])
	const listtwo = ref([])
	
	
	// API
	const getInfo = async () => {
		const { data:res } = await API.getHomeApi()
		Maininfo.value = res.data
	}
	const ShopShow = async () => {
		const { data:res } = await API.getRoomShow('hometop')
		listone.value = res.data.map(item => {
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
	}
	const ShopShowother = async () => {
		const { data:res } = await API.getRoomShow('homebtm')
		listtwo.value = res.data.map(item => {
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
	}
	
	onMounted(()=>{
		getInfo()
		ShopShow()
		ShopShowother()
	})
</script>

<style lang="scss" scoped>
	.home {
		padding-top: v-bind(fullH); // 导航栏确定好注释
		min-height: 100vh;
		background-color: #f6f6f6;
		padding-bottom: 40rpx;
		.header {
			padding: 0 30rpx;
		}
		.myswitch{
			margin-top: 40rpx;
		}
		.myantswiper{
			
		}
		.mysort{
			padding: 0 30rpx;
			margin-top: 30rpx;
		}
	}
</style>