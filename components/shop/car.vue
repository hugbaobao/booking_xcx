<template>
	<view class="car">
		<van-goods-action :safe-area-inset-bottom="false">
			  <van-goods-action-icon icon="chat-o" text="客服" open-type="contact" />
		  <van-goods-action-icon icon="cart-o" text="购物车" :info="loginStore.carcount" :url="'/pages/order/car'" />
		  <van-goods-action-button @click="addCar" color="#be99ff" text="加入购物车" type="warning" />
		  <van-goods-action-button color="#7232dd" text="立即购买" />
		</van-goods-action>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { addCarApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	import { useGoodsStore } from '@/stores/goods.js'
	
	const loginStore = useLoginStore()
	const utoast =ref()
	const goods = useGoodsStore()
	
	
	// API
	const addCar = async () => {
		const { data:res } = await addCarApi({
			openid: loginStore.keyInfo.openid,
			goodsid: goods.parseGoods.id,
			state: 0
		})
		if(res.code === 200) {
			utoast.value.show({
				title: '已加入购物车！',
				type: 'success',
				icon: false
			})
			loginStore.refreshOrder()
		}
	}

</script>

<style lang="scss" scoped>
	.car {
		
	}
</style>