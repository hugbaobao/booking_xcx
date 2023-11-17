<template>
	<view class="coupon">
		<view class="tabs">
			<u-tabs :list="list" :is-scroll="false" v-model="current" @change="change"></u-tabs>
		</view>
		
		<view class="list">
			<my-own v-if="showlist.length !== 0" v-for="item in showlist" :key="item.id" :content="item"></my-own>
			<view class="empty" v-else>
				<u-empty text="暂无优惠券" mode="coupon"></u-empty>
			</view>
		</view>
		
		
		<view class="line">
			<van-divider contentPosition="center">推荐领券</van-divider>
			<my-receive v-for="item in tuijian" :key="item.id" :content="item"></my-receive>
		</view>
		
		<view class="box">
			<view class="fix" @click="toCoupon">
				前往领券中心
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { getReceiveApi, getCouponallApi } from '@/http/getinfo.js'
	import MyOwn from '@/components/personal/ticket/own.vue'
	import MyReceive from '@/components/personal/ticket/receive.vue'
	import { useLoginStore } from '@/stores/login.js'
	
	const LoginStore = useLoginStore()
	const tuijian = ref([])  // 推荐
	const list = ref([])  // tab
	const showlist = ref([])
	
	const current = ref(0)
	
	list.value = [{
		name: '未使用'
	}, {
		name: '已使用'
	}, {
		name: '已失效'
	}, {
		name: '优惠码'
	}]
	
	const change = (e) => {
		switch (e){
			case 1:
			showlist.value = LoginStore.Receive.filter(item => item.used === 1)
				break;
			case 2:
			showlist.value = LoginStore.Receive.filter(item => new Date(item.Coupon.expiration) < new Date().setHours(0, 0, 0, 0))
				break;
			case 3:
			showlist.value = []
				break;
			default:
			showlist.value = LoginStore.Receive.filter(item => item.used === 0  && new Date(item.Coupon.expiration) >= new Date().setHours(0, 0, 0, 0))
				break;
		}
	}
				
	const toCoupon = () => {
		uni.navigateTo({
			url:'/pages/personal/coupon'
		})
	}
	
	// API
	const getCoupon = async () => {
		const already = LoginStore.Receive.map(item => {
			return item.code
		})
		const {data:res} = await getCouponallApi(already)
		tuijian.value = res.data[0]
	}
	const getReceive = async () => {
		showlist.value = LoginStore.Receive.filter(item => item.used === 0  && new Date(item.Coupon.expiration) >= new Date().setHours(0, 0, 0, 0))
	}
	
	onMounted(() => {
		getCoupon()
		getReceive()
	})
				
</script>

<style lang="scss" scoped>
	.coupon {
		min-height: 100vh;
		background-color: #f6f6f6;
		font-size: 24rpx;
		padding: 80rpx 0;
		.tabs{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
		}
		.list {
			.empty{
				margin-top: 200rpx;
			}
		}
		.line{
			margin-top: 50rpx;
			padding: 20rpx;
		}
		
		.box {
			position: fixed;
			bottom: 0;
			width: 100%;
			left: 0;
			padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			.fix{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				color: #97642d;
				text-align: center;
				border: 1px solid #979288;
				border-radius: 5rpx;
				background-color: #fff;
			}
		}
	}
</style>