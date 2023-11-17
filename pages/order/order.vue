<template>
	<view class="order">
		<view class="tabs">
			<u-tabs active-color="#f29100" :list="list" :is-scroll="false" v-model="current" @change="tabsChange"></u-tabs>
		</view>
		
		<view class="list">
			<scroll-view scroll-y="true" class="scroll-Y" :scroll-top="scrollTop" @scrolltolower="lower" @scroll="scroll" scroll-anchoring>
				<view class="scroll-view-item" v-for="item in filterList" :key="item.id">
					
					<van-swipe-cell :right-width="65">
						
					  <view class="part" @click="toGoodsDetail(item)">
					  	<view class="item">
					  		<van-card
					  		  :num="item.paycount"
					  		  tag="热销"
					  		  :price="item.Shop.price" 
					  		  :origin-price="item.Shop.original"
					  		  :title="item.Shop.name"
					  		  :thumb="item?.Shop?.cover[0]"
					  		>
							<template #desc>
								<view class="words">{{ item?.Shop?.words }}</view>
							</template>
					  		</van-card>
					  	</view>
						
						<view class="handle">
							<!-- <view class="">
								<van-icon name="ellipsis" />
							</view> -->
							<button size="mini" class="btn" v-if="item.state === 1" @click.stop="pay(item)">支付</button>
							<button size="mini" class="btn" v-if="item.state === 3">查看物流</button>
							<button size="mini" class="btn" v-if="item.state === 4">评价</button>
							<button size="mini" class="btn" style="color:#f29100;borderColor:#f29100" @click.stop="addCar(item.Shop.id)">加入购物车</button>
						</view>
						
					  </view>
					  
					  <view slot="right" class="van-swipe-cell__right" @click="delgoods(item.id)">删除</view>
					</van-swipe-cell>
					
				</view>
				
				<view class="empty" v-if="filterList.length === 0">
					<u-empty text="订单为空" mode="car"></u-empty>
				</view>
				
			</scroll-view>
		</view>
	</view>
	
	<button type="default" class="fix" @click="show = true">
		选择优惠券
	</button>
	
	<van-action-sheet
	  :show="show"
	  :actions="actions"
	  description="选择优惠券" 
	  cancel-text="取消" 
	  @select="couponselect" 
	  @cancel="show = false"
	  @click-overlay="show = false"
	/>
	
	<u-toast ref="utoast" />
	
	<!-- 提交订单 -->
	<van-submit-bar
	  :disabled="comput === 0"
	  :price="comput"
	  button-text="提交订单"
	  @submit="onSubmit" 
	  v-if="current === 1">
	  <view slot="tip" v-if="LoginStore.userMsg.address === ''">您还未添加收货地址</view>
	</van-submit-bar>
</template>

<script setup>
	import { ref, nextTick, watchEffect, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useLoginStore } from '@/stores/login.js'
	import { useGoodsStore } from '@/stores/goods.js'
	import { delByidApi, paySuccessApi, addCarApi, shopRawApi, payAllApi } from '@/http/getinfo.js'
	import { getPay } from '@/http/pay.js'
	
	const utoast =ref()
	const LoginStore = useLoginStore()
	const goodsStore = useGoodsStore()
	const current = ref(0) 
	const show = ref(false)  // 优惠券弹窗
	const selectCoupon = ref(null)  // 选中的优惠券
	
	const comput = computed(()=>{
		if(filterList.value.length !== 0 && current.value === 1) {
			const result = filterList.value.reduce((total, item) => {
				return (total + item.paycount * parseFloat(item.Shop.price))
			}, 0)
			return result * 100
		} else {
			return 0
		}
	})
	const onSubmit = async () => {
		console.log(filterList.value);
		return
		if(LoginStore.userMsg.address === '') {
			utoast.value.show({
				title: '请先填写收件地址！',
				type: 'warning',
				icon: false
			})
			await setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/setmymsg'
				})
			},2000)
			return
		}
		let total = comput.value / 100
		let flag = false
		if(selectCoupon.value !== null) {
			flag = total >= parseFloat(selectCoupon.value.cill)
			if(flag){
				total = ((total * 100 - parseFloat(selectCoupon.value.subname) * 100) / 100).toFixed(2)
			}
		}
		total = parseFloat(total) <= 0 ? 0 : parseFloat(total)
		let timestamp = Date.parse(new Date()) / 1000;
		let out_trade_no = timestamp + "" + Math.ceil(Math.random() * 10000);
		uni.showLoading({
			title: '提交中'
		});
		const { data:res } = await getPay(LoginStore.keyInfo.openid, out_trade_no, total)
		uni.hideLoading();
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.package,
			signType: 'MD5',
			paySign: res.paySign,
			success:async (payres)=>{
				// 批量修改支付状态...
				payAllSuccess(filterList.value, out_trade_no)
				if(flag) {
					useCoupon(selectCoupon.value.id)
				}
				LoginStore.refreshOrder()
				uni.showToast({
					title:'支付成功！',
					icon:'success'
				})
			},
			fail:(err)=>{
				console.log('fail', err);
				uni.showToast({
					title:'支付失败！',
					icon:"error"
				})
			}
		})
	}
	
	// 优惠券列表
	const actions = computed(()=>{
		return LoginStore.usefulReceive.map(item => {
			return {
				id: item.id,
				name: item.Coupon.name,
				subname: item.Coupon.amount,
				cill: item.Coupon.cill
			}
		})
	})
	const couponselect = (e) => {
		selectCoupon.value = e.detail
		show.value = false
	}
	
	const list = [
		{
			name: '全部'
		},{
			name: '待付款'
		},{
			name: '待发货'
		}, {
			name: '待收货'
		}, {
			name: '待评价',
			count: LoginStore.pingCount
		},
	]
	
    const goodsLsit = ref([])
	const filterList = ref([])
	
	const toGoodsDetail = (val) => {
		val.Shop.simple = JSON.stringify(val.Shop.simple)
		goodsStore.goodsChange(val.Shop)
		uni.navigateTo({
			url:'/pages/order/goodsdetail'
		})
	}
	
	watchEffect(() => {
		goodsLsit.value = LoginStore.order.map(item => {
	    	return {
	    		...item,
	    		Shop: {
	    			...item.Shop,
	    			cover: JSON.parse(item.Shop.cover),
	    			simple: JSON.parse(item.Shop.simple)
	    		}
	    	}
	    }).filter(item => item.state !== 0)
	})
	watchEffect(() => {
		if(current.value === 0) {
			filterList.value = goodsLsit.value
		} else {
			filterList.value = goodsLsit.value.filter(item => item.state === current.value)
		}
	})
	
	const scrollTop = ref(0)
	const oldscrollTop = ref(0)
	
	// 滚动更新scrolltop值
	const scroll = (e) => {
		oldscrollTop.value = e.detail.scrollTop
	}
	
	// method 
	// tabs通知swiper切换
	const tabsChange = async (index) => {
		current.value = index
		// 下面为了tab切换时能复位到顶部
		scrollTop.value = oldscrollTop.value
		await nextTick()
		scrollTop.value = 0
	}
	
	// 滚动到底部
	const lower = (e) => {
		console.log(e)
	}
	
	onLoad((val) => {
		if(val.current) {
			current.value = parseInt(val.current)
		}
	})
	
	// 单独支付
	const pay = async (iftotal,val) => {
		if(LoginStore.userMsg.address === '') {
			utoast.value.show({
				title: '请先填写收件地址！',
				type: 'warning',
				icon: false
			})
			await setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/setmymsg'
				})
			},2000)
			return
		}
		let total = val.paycount * val.Shop.price
		let flag = false
		if(selectCoupon.value !== null) {
			flag = total >= parseFloat(selectCoupon.value.cill)
			if(flag){
				total = ((total * 100 - parseFloat(selectCoupon.value.subname) * 100) / 100).toFixed(2)
			}
		}
		total = parseFloat(total) <= 0 ? 0 : parseFloat(total)
		let timestamp = Date.parse(new Date()) / 1000;
		let out_trade_no = timestamp + "" + Math.ceil(Math.random() * 10000);
		uni.showLoading({
			title: '提交中'
		});
		const { data:res } = await getPay(LoginStore.keyInfo.openid, out_trade_no, total)
		uni.hideLoading();
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.package,
			signType: 'MD5',
			paySign: res.paySign,
			success:async (payres)=>{
				console.log('paysuccess', payres);
				// 修改支付状态...
				paySuccess(val.id, out_trade_no)
				shopRaw(val.Shop.id, val.paycount)
				if(flag) {
					useCoupon(selectCoupon.value.id)
				}
				LoginStore.refreshOrder()
				uni.showToast({
					title:'支付成功！',
					icon:'success'
				})
			},
			fail:(err)=>{
				console.log('fail', err);
				uni.showToast({
					title:'支付失败！',
					icon:"error"
				})
			}
		})
	}
	
	// 支付成功
	const paySuccess = async (ids, val) => {
		const { data:res } = await paySuccessApi({
			id: ids,
			state: 2,
			out_trade_no: val
		})
	}
	// 去库存
	const shopRaw = async (ids, val) => {
		const { data:res } = await shopRawApi(ids, val)
	}
	// 批量支付成功
	const payAllSuccess = async (val, outtrade) => {
		const { data:res } = await payAllApi({
			lists: val,
			outtrade: outtrade
		})
	}
	
	
	// 删除商品
	const delgoods = async (val) => {
		const { data:res } = await delByidApi(val)
		if(res.code === 200) {
			LoginStore.refreshOrder()
			goodsLsit.value.filter((item, index) => {
				if(item.id === val) {
					goodsLsit.value.splice(index, 1)
				}
			})
		}
	}
	
	// 销毁已使用优惠券
	const useCoupon = async (val) => {
		await useCouponApi(val)
		LoginStore.Receive = LoginStore.Receive.filter(item => item.id !== val)
	}
	
	
	// 加购
	const addCar = async (val) => {
		const { data:res } = await addCarApi({
			openid: LoginStore.keyInfo.openid,
			goodsid: val,
			state: 0
		})
		if(res.code === 200) {
			utoast.value.show({
				title: '已加入购物车！',
				type: 'success',
				icon: false
			})
			LoginStore.refreshOrder()
		}
	}
	
</script>

<style lang="scss" scoped>
	.order {
		padding-top: 82rpx;
		.tabs {
			width: 100%;
			height: 82rpx;
			overflow: hidden;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
		}
		.list{
			.scroll-Y {
				height: calc(100vh - 82rpx);
				background-color: #f1f2f3;
				.scroll-view-item {
					padding: 0 10rpx;
					margin-top: 15rpx;
					.part{
						border-radius: 20rpx;
						background-color: #fff;
						overflow: hidden;
						
						.handle {
							display: flex;
							justify-content: flex-end;
							align-items: center;
							padding: 10rpx 30rpx;
							.btn {
								width: 160rpx;
								border: 1px solid #c4c5c7;
								background-color: #fff;
								border-radius: 30rpx;
								margin: 0;
								padding: 0;
								margin-left: 30rpx;
								&::after{
									border: none;
								}
							}
						}
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
	
	.fix {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 30rpx;
		bottom: 250rpx;
		border-radius: 50%;
		padding: 30rpx 20rpx;
		text-align: center;
		line-height: 1.2;
		background: linear-gradient(145deg, #fff, #e6e6e6);
		box-shadow:  8rpx 8rpx 7rpx #d9d9d9,
		             -8rpx -8rpx 7rpx #fff;
	}
</style>
