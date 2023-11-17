<template>
	<view class="jifen">
		<view class="header">
			<text class="sum">{{ LoginStore.userMsg.integral }}</text>
			<view class="tip">
				<text style="margin-right: 6rpx;">使用须知</text>
				<van-icon name="info-o" @click="showDialog" />
			</view>
			
			<van-dialog id="van-dialog" />
		</view>
		
		<view class="tabs" shrink>
			<van-tabs @change="onChange" line-width="20px" color="#f8ab54">
			  <van-tab title="获取记录"></van-tab>
			  <van-tab title="使用明细"></van-tab>
			</van-tabs>
		</view>
		
		<view class="list">
			<my-jifen :getlist="isget ? getlist : uselist"></my-jifen>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, computed, watchEffect } from 'vue'
	import Dialog from '@/wxcomponents/vant/dialog/dialog'
	import MyJifen from '@/components/personal/jifen.vue'
	import { useLoginStore } from '@/stores/login.js'
	import { getIntegralApi } from '@/http/getinfo.js'
	
	const LoginStore = useLoginStore()
	
	const showDialog = () => {
		Dialog.alert({
		  message: '积分使用解释权归本小程序所有',
		  theme: 'round-button',
		}).then(() => {
		  // on close
		});
	}
	
	const active = ref(0)
	const isget = ref(true)  // 决定是获取还是使用
	
	const onChange = (e) => {
		if(e.detail.index === 0) {
			isget.value = true
		} else {
			isget.value = false
		}
	}
	
	const dataAll = ref([])
	
	const getlist = computed(()=>{
		const initdata = dataAll.value.filter(item => item.type === 0)
		// const result = initArr(initdata)
		return initdata
	})
	const uselist = computed(()=>{
		const initdata = dataAll.value.filter(item => item.type !== 0)
		// const result = initArr(initdata)
		return initdata
	})

    // 格式化数据
    // const initArr = (arrval) => {
    // 	const arr = []
    // 	arrval.value.forEach(item => {
    // 		const time = item.datetime.split(' ')[0]
    // 		const index = arr.findIndex(item => item.time === time)
    // 		if(index === -1) {
    // 			arr.push({
    // 				time,
    // 				list: [item]
    // 			})
    // 		} else {
    // 			arr[index].list.push(item)
    // 		}
    // 	})
    // 	return arr
    // }
	
	// API
	const getIntegral = async () => {
		const { data:res } = await getIntegralApi(LoginStore.keyInfo.openid)
		dataAll.value = res.data
	}
	
	
	
	onMounted(() => {
		getIntegral()
	})
</script>

<style lang="scss" scoped>
	.jifen {
		.header {
			background: linear-gradient(to right bottom, #fff1ce, #ffe1b9, #fff6e5);
			height: 250rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 30rpx;
			.sum {
				font-size: 45rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
				color: #532f15;
			}
			.tip {
				font-size: 20rpx;
				color: #b29f89;
				display: flex;
				align-items: center;
			}
		}
		
		.tabs {
			border-radius: 20rpx;
			overflow: hidden;
		}
		
		.list{
		}
	}
</style>