<template>
	<view class="select">
		<view class="drop_item">
			<view class="label">
				酒店选择
			</view>
			<view class="drop">
				<u-dropdown :height="60" @open="open1" @close="flag1 = true" ref="dropdown1">
					<u-dropdown-item @change="selected1" style="justify-content: flex-end;" :title="values1" :options="hotellist">
					</u-dropdown-item>
				</u-dropdown>
				
				<view class="icon">
					<view class="ificon" v-if="flag1">
						<u-icon name="arrow-down-fill" color="#bfbfbf"></u-icon>
					</view>
					<view class="ificon" v-else>
						<u-icon name="arrow-up-fill" color="#bfbfbf"></u-icon>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="drop_item">
			<view class="label">
				房型选择
			</view>
			<view class="drop">
				<u-dropdown :height="60" @open="open2" @close="flag2 = true" ref="dropdown2">
					<u-dropdown-item @change="selected2" style="justify-content: flex-end;" :title="values2" :options="typelist" height="400">
					</u-dropdown-item>
				</u-dropdown>
				
				<view class="icon">
					<view class="ificon" v-if="flag2">
						<u-icon name="arrow-down-fill" color="#bfbfbf"></u-icon>
					</view>
					<view class="ificon" v-else>
						<u-icon name="arrow-up-fill" color="#bfbfbf"></u-icon>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>


<script setup>
	import { ref, watchEffect } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useHotelStore } from '@/stores/hotel.js'
	
	const HotelStore = useHotelStore()
	const dropdown1 = ref()
	const dropdown2 = ref()
	
	const values1 = ref('')
	const values2 = ref('')
	
	let flag1 = ref(true)
	let flag2 = ref(true)
	
	const props = defineProps({
		// 数据列表
		hotellist: {
			default: [
	    	    {
	    	    	label: '选择酒店',
	    	    	value: '1206840427889167',
	    	    }
	        ]
		},
		typelist: {
			default: [
	        	{
	        		label: '选择房型',
	        		value: '000',
	        	}
	        ]
		}
	})
	
	const topicker = () => {
		uni.navigateTo({
			url:'/pages/picker/calendar'
		})
	}
	
	const selected1 = (val) => {
		let target = props.hotellist.find(item =>item.value === val)
		values1.value = target.label
		HotelStore.OrgId = val
		HotelStore.OrgName = target.label
	}
	
	const selected2 = (val) => {
		let target = props.typelist.find(item =>item.value === val)
		HotelStore.RoomTypeId = val
		HotelStore.RoomTypeName = target.label
		values2.value = target.label
	}
	
	const open1 = () => {
		flag1.value = false
		dropdown2.value.close()
	}
	
	const open2 = () => {
		flag2.value = false
		dropdown1.value.close()
	}
	
	watchEffect(()=>{
		values2.value = HotelStore.RoomTypeName
	})

</script>

<style lang="scss" scoped>
	.select {
		margin-bottom: 20rpx;
		.drop_item {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			&:first-child {
				z-index: 999;
			}
			.label{
				width: 170rpx;
				text-align: center;
				background-color: #cccccc;
				padding: 10rpx 20rpx;
				border-radius: $radius1;
				margin-right: 10rpx;
				font-size: 28rpx;
			}
			.drop {
				flex: 1;
				position: relative;
				border-bottom: 1px solid #bfbfbf;
				.icon {
					position: absolute;
					right: 0;
					height: 60rpx;
					line-height: 60rpx;
					top: 1px;
					background-color: #fafafa;
					width: 60rpx;
					text-align: center;
				}
			}
		}
	}
</style>