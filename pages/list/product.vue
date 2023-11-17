<template>
	<view class="prolist">
		<view class="input">
			<!-- 是否自动获得焦点,可以一键清除 -->
			<u-search focus placeholder="请输入想要搜索的商品" input-align="center" v-model="keyword" :clearabled="true" @search="handleSearch" @custom="handleSearch" style="width: 100%;">
			</u-search>
		</view>
		
		<view class="proList">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
				<view class="content">
					<my-sell v-for="item in proList" :key="item.id" :product="item" class="mysell"></my-sell>
				</view>
			</scroll-view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getByTypageApi, searchByNameApi } from '@/http/getinfo.js'
	import MySell from '@/components/common/sell.vue'
	
	const utoast =ref()
	const keyword = ref('')
	const proList = ref([])
	const ifempty = ref(false)
	const page = ref(1)
	const keys = ref('')
	
	// 搜索商品
	const handleSearch = (val) => {
		if(val === '' && proList.value.length === 0) {
			page.value = 1
			getList(keys.value, page.value)
		}else {
			search(val)
		}
	}
	
	const lower = () => {
		if(ifempty.value === false) {
			page.value ++ 
			getList(keys.value, page.value)
		} else {
			utoast.value.show({
				title: '没有更多了！',
				type: 'warning',
				icon: false
			})
		}
	}
	
	onLoad((keys)=>{
		keys.value = keys.type
		getList(keys.value, page.value)
	})
	
	// API 
	const getList = async (key, val) => {
		const { data:res } = await getByTypageApi(key, val)
		res.data = res.data.map(item => {
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
		proList.value = [...proList.value,...res.data]
		if(res.data.length < 20) {
			ifempty.value = true
		}
	}
	// 查询
	const search = async (words) => {
		const { data:res } = await searchByNameApi(words)
		res.data = res.data.map(item => {
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
		proList.value = res.data
	}
	
</script>

<style lang="scss" scoped>
	.prolist{
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.input{
			width: 100%;
			height: 5vh;
			display: flex;
			align-items: center;
		}
		.proList {
			flex: 1;
			width: 100%;
			height: 100%;
			.scroll-Y {
				height: 95vh;
				padding: 20rpx;
				box-sizing: border-box;
				.content {
					display: flex;
					flex-wrap: wrap;
					.mysell{
						width: 30%;
						margin-right: 5%;
						&:nth-child(3n) {
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>