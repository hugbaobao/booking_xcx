<template>
	<view class="search">
		<view class="input">
			<!-- 是否自动获得焦点,可以一键清除 -->
			<u-search focus placeholder="请输入想要搜索的商品" input-align="center" v-model="keyword" :clearabled="true" @search="handleSearch" @custom="handleSearch">
			</u-search>
		</view>
		
		<view class="result">
			<my-addcar v-for="item in proList" :key="item.id" :goods="item"></my-addcar>
		</view>
		
		<view class="line">
			<van-divider contentPosition="left" textColor="#1989fa">推荐商品</van-divider>
		</view>
		
		<view class="list">
			<my-addcar :goods="sugestList"></my-addcar>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import MyAddcar from '@/components/search/addcar.vue'
	import { getByTypeApi,searchByNameApi } from '@/http/getinfo.js'
	
	const keyword = ref('')
	const proList = ref([])
	const sugestList = ref(null)
	
	const handleSearch = (val) => {
		search(val)
	}
	
	// API 
	const getInfo = async () => {
		const { data:res } = await getByTypeApi(4)
		res.data = res.data.map(item=>{
			return {
				...item,
				cover: JSON.parse(item.cover)
			}
		})
		sugestList.value = res.data[0]
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
	
	onMounted(()=>{
		getInfo()
	})
</script>

<style lang="scss" scoped>
	.search {
		.input {
			padding: 20rpx;
		}
		.result{
			padding: 20rpx;
		}
		.line {
			margin-top: 200rpx;
		}
		.list {
			background-color: #fff;
			padding: 20rpx;
		}
	}
</style>