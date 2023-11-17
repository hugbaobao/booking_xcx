<template>
	<view class="room" @click="test">
		
		<view class="myantswiper" v-if="ifShow">
			<my-ant-swiper :list="swiperList" :ifdots="true"></my-ant-swiper>
		</view>
		
		<view class="myselect">
			<my-select :hotellist="optionshotel" :typelist="optionsroom"></my-select>
			
			<my-select-time></my-select-time>
			
			<view class="btn">
				<u-button type="success" shape="circle" title="入住时间" @click="toselect">
					<text>去选房间</text>
					<van-icon name="arrow" />
				</u-button>
			</view>
		</view>

		
		<view class="goods">
			<my-sell v-for="item in list" :key="item.id" :product="item" class="mysell"></my-sell>
		</view>

	</view>
	
	<u-toast ref="utoast" />
	<my-mixin></my-mixin>
</template>

<script setup>
	import MyAntSwiper from '@/components/home/antswiper.vue'
	import MySelect from '@/components/room/select.vue'
	import MySelectTime from '@/components/room/selecttime.vue'
	import MySell from '@/components/common/sell.vue'
	import MyMixin from '@/components/mixin/mixin.vue'
	import * as API from '@/http/getinfo.js'
	import { onMounted, ref, getCurrentInstance } from 'vue'
	import { getSignature } from '@/http/signature.js'
	import { useHotelStore } from '@/stores/hotel.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const LoginStore = useHotelStore()
	const utoast =ref()
	const HotelStore = useHotelStore()
	
	// 酒店列表
	let optionshotel = ref([
		{
			label: '选择酒店',
			value: '1206840427889167',
		}
	])
	// 房型列表
	let optionsroom = ref([])
	// 商品列表
	const list = ref([])
	
	const swiperList = ref([])
	const ifShow = ref(true)
	
	// 选择房间
	const toselect = () => {
		if(LoginStore.isLogin === false){
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
		}else if(HotelStore.ArriveTime === '' || HotelStore.ArriveTime === 'DepartureTime') {
			utoast.value.show({
				title: '请先选择入住时间！',
				type: 'warning',
				icon: false
			})
			return
		} else {
			uni.navigateTo({
				url:'/pages/room/select'
			})
		}
	}
	
	// API
	// 酒店简单信息
	const getHotelList = async () => {
		const {data:res} = await getSignature('Hotel.GetOrgInfo',{OrgId:'1206840427889167'})
		if(res.Code === 10000) {
			// console.log(111,res.Data);
			HotelStore.Address = res.Data.Address
			HotelStore.OrgName = res.Data.OrgName
			HotelStore.Longitude = res.Data.WeMapLng
			HotelStore.Latitude = res.Data.WeMapLat
			optionshotel.value = [
				{
					label: res.Data.OrgName,
					value: '1206840427889167',
				}
			]
		}
	}
	
	// 房型数据
	const getRoomList = async () => {
		const {data:res} = await getSignature('Hotel.GetOrgRoomTypes',{OrgId:'1206840427889167'})
		if(res.Code === 10000) {
			// console.log(222,res.Data);
			const initarr = res.Data.map(item => {
				return {
					label: item.RoomTypeName,
					value: item.RoomTypeId
				}
			})
			const empty = {
				label: '暂不选择',
				value: '',
			}
			HotelStore.roomType = optionsroom.value = [empty, ...initarr]
		}
	}
	

	// API 
	const getInfo = async () => {
		const { data:res } = await API.getRoom()
		swiperList.value = res.data.banner
		ifShow.value = res.data.switch
	}
	const ShopShow = async () => {
		const { data:res } = await API.getRoomShow('room')
		list.value = res.data.map(item => {
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
	}
	
	onMounted(()=>{
		getRoomList()
		getInfo()
		ShopShow()
		getHotelList()
	})
</script>

<style lang="scss" scoped>
	.room {
		min-height: 100vh;
		background-color: #fafafa;
		padding-bottom: 30rpx;
		overflow: hidden;
		.myantswiper{
			width: 750rpx;
		}
		
		.myselect {
			padding: 0 30rpx;
			margin-top: 20rpx;
			.btn {
				padding: 0 30rpx;
			}
		}
		.goods {
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30rpx;
			.mysell{
				width: 30%;
				margin-right: 5%;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}

</style>