<template>
	<view class="car">
		
		<view class="list">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower" @scroll="scroll" scroll-anchoring>
				<view class="scroll-view-item" v-for="item in goodslist" :key="item.id">
					
					<van-swipe-cell :right-width="65">
						
					  <view class="part" @click="toGoodsDetail(item)">
					  	<view class="item">
					  		<van-card
					  		  :num="item?.count"
					  		  tag="热销"
					  		  :price="item?.Shop?.price" 
					  		  :origin-price="item?.Shop?.original"
					  		  :title="item?.Shop?.name"
					  		  :thumb="item?.Shop?.cover[0]"
					  		>
							<template #desc>
								<view class="words">{{ item?.Shop?.words }}</view>
							</template>
					  		</van-card>
					  	</view>
					  </view>
					  
					  <view slot="right" class="van-swipe-cell__right" @click="delgoods(item.id)">删除</view>
					</van-swipe-cell>
					
				</view>
				
				<view class="empty" v-if="goodslist.length === 0">
					<u-empty text="订单为空" mode="car"></u-empty>
				</view>
				
			</scroll-view>
		</view>
		
		<view class="fix">
			<van-submit-bar
			  :price="totalfee * 100"
			  button-text="提交订单"
			  @submit="onClickButton"
			  :tip="true"
			>
			  <!-- <van-tag type="primary">标签</van-tag>
			  <view slot="tip">您的收货地址不支持同城送, <text>修改地址</text></view> -->
			</van-submit-bar>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useLoginStore } from '@/stores/login.js'
    import { delByidApi, changeArrApi } from '@/http/getinfo.js'
    import { useGoodsStore } from '@/stores/goods.js'
	
    const LoginStore = useLoginStore()
	const goodsStore = useGoodsStore()
	const goodslist = ref([])
	 
	goodslist.value = LoginStore.order.map(item => {
		return {
			...item,
			Shop: {
				...item.Shop,
				cover: JSON.parse(item.Shop.cover),
				simple: JSON.parse(item.Shop.simple)
			}
		}
	}).filter(item => item.state === 0)
	
    const totalfee = computed(() => {
		return goodslist.value.reduce((total, item) => {
			return (total + item.count * item.Shop.price)
		}, 0)
		})

	const toGoodsDetail = (val) => {
		val.Shop.simple = JSON.stringify(val.Shop.simple)
		goodsStore.goodsChange(val.Shop)
		uni.navigateTo({
			url:'/pages/order/goodsdetail'
		})
	}
	
	// 删除商品
	const delgoods = async (val) => {
		const { data:res } = await delByidApi(val)
		if(res.code === 200) {
			LoginStore.refreshOrder()
			goodslist.value.filter((item, index) => {
				if(item.id === val) {
					goodslist.value.splice(index, 1)
				}
			})
		}
	}
	
	
	const onClickButton = () => {
		if(goodslist.value.length === 0) {
			return
		}
		// 获取购物车列表的id
		const ids = goodslist.value.map(item => item.id)
		changeArr(ids)
	}
	
	// 批量修改状态
	const changeArr = async(arr) => {
		const { data:res } = await changeArrApi(arr)
		if (res.code === 200) {
			LoginStore.refreshOrder()
			uni.navigateTo({
				url:'/pages/order/order?current=1'
			})
		}
	}

</script>

<style lang="scss" scoped>
	.car {
		background-color: #f1f2f3;
		height: 100vh;
		padding-bottom: 180rpx;
		.list{
			height: 100%;
			
			.scroll-Y {
				// height: calc(100vh - 82rpx);
				height: 100%;
				background-color: #f1f2f3;
				.scroll-view-item {
					padding: 0 10rpx;
					margin-top: 15rpx;
					.part{
						background-color: #fff;
						overflow: hidden;
						.item {
							.words {
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
							}
						}
					}
					.van-swipe-cell__right{
						height: 100%;
						background-color: #fe0000;
						color: #fff;
						text-align: center;
						width: 130rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				
				.empty{
					margin-top: 200rpx;
				}
			}
		}
	}
</style>