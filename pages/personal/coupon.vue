<template>
	<view class="coupon">
		<view class="list" v-if="list.length !== 0">
			<my-receive v-for="item in list" :key="item.id" :content="item"></my-receive>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import MyReceive from '@/components/personal/ticket/receive.vue'
	import { getCouponallApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const LoginStore = useLoginStore()
	const list = ref([])
	
	// API 
	const getCoupon = async () => {
		const already = LoginStore.Receive.map(item => {
			return item.code
		})
		const {data:res} = await getCouponallApi(already)
		list.value = res.data
	}
	
	onMounted(() => {
		getCoupon()
	})

</script>

<style lang="scss" scoped>
	.coupon {
		min-height: 100vh;
		background-color: #f6f6f6;
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		.list {
		}
	}
</style>