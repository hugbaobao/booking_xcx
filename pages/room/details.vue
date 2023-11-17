<template>
	<view class="details">
		<view class="png">
			<image :src="HotelStore.selectedRoom.ImageUris" mode="" class="img"></image>
		</view>
		
		<view class="name">
			<text class="price">￥{{ HotelStore.selectedPrinceInfo.OrignPrice }}</text>
			<text>{{ `${HotelStore.selectedPrinceInfo?.RoomType?.RoomTypeName} - ${HotelStore.selectedRoom.RoomNumber}` }}</text>
		</view>
		
		<view class="cans">
			<view class="name">
				{{ HotelStore.selectedPrinceInfo?.RoomType?.RoomTypeName }}
			</view>
			
			<view class="flex">
				<view class="item" v-for="(item, index) in attrarr" :key="index">
					<van-icon name="hotel-o" size="50rpx" />
					<text class="font">{{ item }}</text>
				</view>
			</view>
			
			<view class="line">
				<van-icon name="birthday-cake-o" size="50rpx" />
				<view class="words">
					<text class="wfont">{{ HotelStore.selectedRoom.HallName }}</text>
					<text class="wfont">{{ HotelStore.selectedRoom.FloorName }}层</text>
					<text class="wfont">{{ HotelStore.selectedRoom.IsNetLock ? '网络门锁' : '非网络门锁' }}</text>
					<text class="wfont">{{ HotelStore.selectedPrinceInfo.RoomType.OrgRoomTypeDescription }}</text>
				</view>
			</view>
			
			<view class="line">
				<van-icon name="birthday-cake-o" size="50rpx" />
				<view class="words">
					<text class="wfont">{{ HotelStore.selectedPrinceInfo.RoomType.BedAmount }}张床</text>
					<text class="wfont">{{ HotelStore.selectedPrinceInfo.RoomType.BedType}}</text>
				</view>
			</view>
			
			<view class="line" v-if="HotelStore.sevicetag.length !== 0">
				<van-icon name="birthday-cake-o" size="50rpx" />
				<view class="words">
					<text class="wfont" style="color: #80bfaa;" v-for="(item, index) in HotelStore.sevicetag" :key="index">{{ item }}</text>
				</view>
			</view>
			
			<view class="line" v-if="HotelStore.selectedRoom.Description">
				<van-icon name="birthday-cake-o" size="50rpx" />
				<view class="words">
					<text class="wfont">{{ HotelStore.selectedRoom.Description }}</text>
				</view>
			</view>
		</view>
		
		<view class="fix" @click="totooking">
			立即预定
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	
	const HotelStore = useHotelStore()
	// console.log(111,HotelStore.selectedRoom,HotelStore.selectedPrinceInfo);
	const attrarr = computed(()=>{
		if(HotelStore.selectedRoom.Attribute !== null) {
			return HotelStore.selectedRoom.Attribute.split('?')
		} else {
			return []
		}
	})
	// console.log(HotelStore.sevicetag);
	
	const totooking = ()=> {
		uni.navigateTo({
			url:'/pages/room/booking'
		})
	}

</script>

<style lang="scss" scoped>
	.details {
		min-height: 100vh;
		background-color: #f6f6f6;
		padding: 20rpx 0 100rpx;
		.png {
			width: 700rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			overflow: hidden;
			.img {
				width: 100%;
				height: 400rpx;
				// background-color: #84dba7;
			}
		}
		
		.name{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 40rpx 50rpx;
			font-weight: bold;
			.price {
				color: #fe0000;
				font-size: 36rpx;
				margin-bottom: 15rpx;
			}
		}
		
		.cans {
			padding: 20rpx 30rpx 30rpx;
			background-color: #fff;
			margin-top: 20rpx;
			.name{
				font-size: 32rpx;
				margin-bottom: 40rpx;
				padding: 0;
			}
			.flex {
				display: flex;
				flex-wrap: wrap;
				border-bottom: 2rpx solid #f6f6f6;
				.item {
					width: 33%;
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;
					.font {
						margin-left: 15rpx;
					}
				}
			}
			
			.line{
				display: flex;
				align-items: flex-start;
				margin-top: 30rpx;
				.words {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					font-size: 24rpx;
					font-weight: bold;
					.wfont {
						line-height: 1.8;
					}
				}
			}
		}
		
		.fix {
			position: fixed;
			left: calc(50% - 300rpx);
			bottom: 30rpx;
			width: 600rpx;
			height: 90rpx;
			border-radius: 45rpx;
			line-height: 90rpx;
			background-color: #464756;
			color: #f1cc97;
			font-size: 34rpx;
			text-align: center;
		}
	}
</style>