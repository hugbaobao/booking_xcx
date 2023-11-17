<template>
	<view class="select">
		<view class="my-screen">
			<my-screen @typeChange="refresh"></my-screen>
		</view>
		
		<van-sticky style="width: 750rpx;">
		  <view class="mytabs">
		  	<my-tabs @attrChange="changeAttr" :roomlist='roomList'></my-tabs>
		  </view>
		</van-sticky>
		
		<view class="content" v-if="sendList">
			<my-scrolly :roomList="sendList"></my-scrolly>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue'
	import MyScreen from '@/components/list/screen.vue'
	import MyTabs from '@/components/list/tabs.vue'
	import { useHotelStore } from '@/stores/hotel.js'
	import { getSignature } from '@/http/signature.js'
	import MyScrolly from '@/components/common/scrolly.vue'
	
	const HotelStore = useHotelStore()
	const roomList = ref([])
	const sendList = ref([])
	
	const changeAttr = (val) => {
		if(val === '') {
			sendList.value = roomList.value
		} else {
			sendList.value = roomList.value.filter((items) => items.Attribute && items.Attribute.indexOf(val) !== -1)
		}
	}
	
	const refresh = () => {
		// 重新调用api
		getRoomCanUse()
	}
	
	// API
	// 差房价
	const getRoominfo = async () => {
		const requestData = {
	    	OrgIds:[1206840427889167],
	    	ArriveTime: HotelStore.ArriveTime,
	    	DepartureTime: HotelStore.DepartureTime,
	    	OnlyOpenedOrg: true,   // 是否只查询开放接口的酒店信息
	    	PhysicalRoomTypeOnly: true,  // 只查询物理房型
	    	BasicInfoOnly: false,   // 只查询酒店基本信息
	    	IncludeDetailCounts: false,  // 是否包含查询时间段内每天的房量信息
	    	IncludePrices: true,   // 是否包含房价信息
	    	IncludeRoomCounts: true,  // 是否包含房量信息
	    	PageSize: 10,   // 分页大小
	    	PageIndex: 1,   // 页码
	    	MemberLevels: [''],  // 获取散客房价
	    	RoomStatuses: ["VC"]   // 房态
	    }
		const {data:res} = await getSignature('Hotel.SearchOrgWithRoomPriceAndRoomCount', requestData)
		// console.log(444,res);
		if(res.Code === 10000) {
			HotelStore.Prices = res.Data[0].Prices
			HotelStore.sevicetag = res.Data[0].ServiceTags ? res.Data[0].ServiceTags : []
		}
	}
	// 查可用房间
	const getRoomCanUse = async () => {
		const requestdata = {
			OrgId: 1206840427889167,
			RoomStatuses: ['VC'],
			ArriveTime: HotelStore.ArriveTime,
			DepartureTime: HotelStore.DepartureTime,
			CheckinType: 'Normal'
		}
		if(HotelStore.RoomTypeId !== '') {
			requestdata.RoomTypeIds = [HotelStore.RoomTypeId]
		}
		const {data:res} = await getSignature('Hotel.GetAvailableRooms', requestdata)
		// console.log(333,res);
		if(res.Code === 10000) {
			sendList.value = roomList.value = res.Data.splice(0,200)
		}
	}
	
	
	watch(()=>HotelStore.ArriveTime, () => {
		getRoominfo()
	})
	
	onMounted(()=>{
		getRoominfo()
		getRoomCanUse()
	})
</script>

<style lang="scss" scoped>
	.select {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.my-screen {
			width: 100%;
		}
		.mytabs {
			width: 100%;
		}
		.content {
			flex: 1;
			width: 750rpx;
			padding: 0 10rpx;
		}
	}
</style>