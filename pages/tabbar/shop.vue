<template>
	<view class="shop">
		<view class="search">
			<view class="content" @click="toSearch">
				<van-icon name="search" size="35rpx" color="#919191" />
				<text style="margin-left: 15rpx;">请输入搜索的商品</text>
			</view>
		</view>
		
		<view class="side">
			<van-sidebar :active-key="activeKey" @change="onChange">
			  <van-sidebar-item title="热销排行" />
			  <van-sidebar-item title="新品上架" />
			  <van-sidebar-item title="特产" />
			  <van-sidebar-item title="出行穿戴" />
			  <van-sidebar-item title="家用家居" />
			</van-sidebar>
			
			<view class="content">
				<my-hot v-if="activeKey === 0" :cover="pngList?.hot"></my-hot>
				<my-new v-else-if="activeKey === 1" :cover="pngList?.new"></my-new>
				<my-local v-else-if="activeKey === 2" :cover="pngList?.local"></my-local>
				<my-wear v-else-if="activeKey === 3" :cover="pngList?.wear"></my-wear>
				<my-home v-else :cover="pngList?.home"></my-home>
			</view>
		</view>
		
		<view>
			<button type="default" class="fix" @click="toOrdercar">
				<van-icon name="cart-o" :info="loginStore.carcount" size="50rpx" />
			</button>
		</view>
		
	</view>
	
	<my-intercept></my-intercept>
</template>

<script setup>
	import { ref, onMounted, watchEffect, computed } from 'vue'
	import * as API from '@/http/getinfo.js'
	import MyHot from '@/components/shop/content/hot.vue'
	import MyNew from '@/components/shop/content/new.vue'
	import MyLocal from '@/components/shop/content/local.vue'
	import MyWear from '@/components/shop/content/wear.vue'
	import MyHome from '@/components/shop/content/home.vue'
	import MyIntercept from '@/components/intercept/intercept.vue'
	import { useLoginStore } from '@/stores/login.js'
	
	const loginStore = useLoginStore()
	const pngList = ref(null)
	const activeKey = ref(0)
	
	const onChange = (event) => {
	  activeKey.value = event.detail
    }
	
	const toSearch = () => {
		uni.navigateTo({
			url:'/pages/search/index'
		})
	}
	
	const toOrdercar = () => {
		uni.navigateTo({
			url:'/pages/order/car'
		})
	}
	
	// API
	const getInfo = async () => {
		const { data:res } = await API.getPngApi()
		pngList.value = res.data[0]
	}
	
	onMounted(()=>{
		getInfo()
	})
</script>

<style lang="scss" scoped>
	.shop {
		min-height: 100vh;
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
		.search {
			padding: 20rpx 24rpx;
			background-color: #fff;
			.content {
				height: 68rpx;
				color: #cac9cc;
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				background-color: #f7f8fa;
			}
		}
		.side{
			flex: 1;
			height: 100%;
			display: flex;
			.content {
				flex: 1;
				background-color: #fff;
				padding: 30rpx;
			}
		}
		
		.fix {
			background-color: #fff;
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			// box-shadow: 0rpx 6rpx 4rpx rgba(0, 0, 0, 0.1),0rpx -6rpx 4rpx rgba(0, 0, 0, 0.1),6rpx 0rpx 4rpx rgba(0, 0, 0, 0.1),-6rpx 0rpx 4rpx rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 30rpx;
			bottom: 80rpx;
			border-radius: 50%;
			background: linear-gradient(145deg, #fff, #e6e6e6);
			box-shadow:  8rpx 8rpx 7rpx #d9d9d9,
			             -8rpx -8rpx 7rpx #fff;
		}
	}
</style>