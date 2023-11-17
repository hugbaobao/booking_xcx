<template>
	<view class="big_box" >
		<map class="map" :latitude="HotelStore?.Latitude" :longitude="HotelStore?.Longitude" :markers="covers"></map>
		<view class="footer">
			<view class="font">
				<text class="bold">{{ HotelStore?.OrgName }}</text>
				<text>{{ HotelStore?.Address }}</text>
			</view>
			<button @click="openMap" class="opento">
				<van-icon name="map-marked" color="#fff" size="60rpx" />
			</button>
		</view>
	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	
	const HotelStore = useHotelStore()
	const covers = ref([
		{
			id: 1,
			latitude: '32.051844',
			longitude: '118.800358',
			iconPath: '',
			width:30,
			height:30
		}
	])
	
	const openMap = () => {
		uni.openLocation({
			latitude: parseFloat(HotelStore.Latitude),
			longitude: parseFloat(HotelStore.Longitude),
			scale: 20,
			name: HotelStore.OrgName,
			address: HotelStore.Address,
			success: function () {
				console.log('打开地图 success');
			}
		});
	}
	
	watchEffect(()=>{
		covers.value = [
			{
				id: 1,
				latitude: HotelStore.Latitude,
				longitude: HotelStore.Longitude,
				iconPath: '',
				width:30,
				height:30
			}
		]
	})

</script>

<style scoped lang="scss">
	.big_box{
		min-height: 100vh;
		.map{
			width: 750rpx;
			height: 100vh;
		}
		.footer{
			width: 750rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
			padding: 40rpx 30rpx;
			.font {
				flex: 1;
				display: flex;
				flex-direction: column;
				color: #636c69;
				.bold {
					font-weight: bold;
					margin-bottom: 15rpx;
					font-size: 36rpx;
					color: #000;
				}
			}
			.opento {
				background-color: #009a01;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0;
			}
		}
	}
</style>