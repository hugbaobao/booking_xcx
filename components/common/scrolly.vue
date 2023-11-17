<template>
	<view class="content">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			<my-block v-for="item in showlist" :key="item.RoomNumber" :roominfo="item"></my-block>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	import MyBlock from '@/components/room/block.vue'
	
	const props = defineProps(['roomList'])
	const showlist = ref([])
	const page = ref(1)
	
	const lower = () => {
		page.value ++
		showlist.value = props.roomList.slice(0, 20 * page.value)
	}
	
	watchEffect(() => {
		showlist.value = props.roomList.slice(0, 20 * page.value)
	})
	
</script>

<style lang="scss" scoped>
	.scroll-Y{
		height: calc(100vh - 170rpx);
	}
</style>