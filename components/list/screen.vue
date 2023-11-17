<template>
	<view class="screen">
		
		<view class="timer" @click="toTimer">
			入住时间
		</view>
		
		<view class="room">
			<u-dropdown :height="60">
				<u-dropdown-item :title="values" @change="selected" style="justify-content: flex-end;" :options="options" height="600">
				</u-dropdown-item>
			</u-dropdown>
		</view>
		
		<navigator class="daohang" url="/pages/map/map">
			<van-icon name="location" size="40rpx" />
		</navigator>
		
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useHotelStore } from '@/stores/hotel.js'
	import { getSignature } from '@/http/signature.js'
	
	const HotelStore = useHotelStore()
	
	const values = ref('选择房型')
	const options = ref([])
	const emits = defineEmits(['typeChange'])
	
	const selected = (val) => {
		let target = options.value.find(item =>item.value === val)
		HotelStore.RoomTypeId = val
		HotelStore.RoomTypeName = target.label
		values.value = target.label
		emits('typeChange')
	}
	
	const toTimer = () => {
		uni.navigateTo({
			url:'/pages/picker/calendar'
		})
	}
	
	// 房型数据
	
	onLoad(()=>{
		options.value = HotelStore.roomType
		values.value = HotelStore.RoomTypeName
	})

</script>

<style lang="scss" scoped>
	.screen {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		padding: 10rpx 20rpx;
		.timer{
			width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			border: 1px solid #b0b1b3;
			border-radius: 6rpx;
		}
		.room{
			flex: 1;
			border: 1px solid #b0b1b3;
			margin: 0 30rpx;
		}
		.daohang{
			width: 60rpx;
			height: 60rpx;
			border-radius: 31rpx;
			border: 1px solid #b0b1b3;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>