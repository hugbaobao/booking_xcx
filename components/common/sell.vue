<template>
	<view class="sell" @click="toGoodsDetail">
		<view class="png">
			<image :src="product.cover[0]" mode="widthFix" class="img"></image>
		</view>
		<view class="discribe">
			<text class="font" :class="{row: product.xian}">{{ product.words }}</text>
			<view class="tagcover" v-if="product.xian">
				<view class="tag">限时抢</view>
			</view>
			<view class="shop">
				<view class="left">
					<text>￥</text>
					<text>{{ product.price }}</text>
				</view>
				<view class="car" @click.prevent="toOrderCar(product.id)">
					<van-icon name="cart-o" color="#f29100" size="40rpx" />
				</view>
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	import { useGoodsStore } from '@/stores/goods.js'
	import { addCarApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const utoast =ref()
	const goodsStore = useGoodsStore()
	const loginStore = useLoginStore()
	
	const props = defineProps({
		product:{
			require: true
		}
	})
	
	const toGoodsDetail = () => {
		goodsStore.goodsChange(props.product)
		uni.navigateTo({
			url:'/pages/order/goodsdetail'
		})
	}
	
	const toOrderCar = (val) => {
		if(loginStore.isLogin === false){
			utoast.value.show({
				title: '请先登录，即将跳转到登录页！',
				type: 'warning',
				icon: false
			})
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},2000)
			return
		}else {
			// 添加到购物车
			addcar(val)
		}
	}
	
	// API 
	const addcar = async (val) => {
		const { data:res } = await addCarApi({
			openid: loginStore.keyInfo.openid,
			goodsid: val,
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
	.sell {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
		.png {
			background-color: gray;
			width: 100%;
			// 让盒子的高度等于宽度
			height: 0;
			padding-bottom: 100%;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 15rpx;
			.img {
				width: 100%;
			}
		}
		.discribe {
			width: 100%;
			padding: 0 10rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.font {
				line-height: 40rpx;
				font-size: 28rpx;
				overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 2;
			    line-clamp: 2;
			    -webkit-box-orient: vertical;
				font-weight: bold;
			}
			.row {
			    -webkit-line-clamp: 1;
			    line-clamp: 1;
			}
			.tagcover {
				height: 36rpx;
				display: flex;
				align-items: center;
				.tag {
					font-size: 20rpx;
					color: #96612d;
					border: 1px solid #96612d;
				    border-radius: 4rpx;
					padding:  2rpx 4rpx;
				}
			}
			.shop {
				width: 100%;
				color: #96612d;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				font-weight: bold;
				.left {
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>