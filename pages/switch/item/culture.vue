<template>
	<view class="culture">
		<view class="png">
			<image :src="pngList?.center" mode="" class="img"></image>
		</view>
		
		<view class="flex">
			<view class="item" v-for="item in List" :key="item.id" @click="toDetail(item.id)">
				<image :src="item.img[0]" mode="widthFix" class="pic"></image>
				<view class="font">{{ item?.title }}</view>
				<view class="btm">
					<view class="left">
						<image src="@/static/picture/img.png" mode="widthFix" class="avtor"></image>
						<text>{{ item?.User?.name }}</text>
					</view>
					<view class="right">
						<van-icon name="like" color="#ff713c" class="icon" />
						<van-icon name="comment-o" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="fix" @click="toAdd">
			<van-icon name="plus" />
			<text class="word">提交我的文创设计</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { getPngApi, getcenterApi } from '@/http/getinfo.js'
	
	const pngList = ref()
	const List = ref([])
	const toDetail = (val) => {
		uni.navigateTo({
			url:'/pages/switch/center?id=' + val
		})
	}
	// 去添加页
	const toAdd = () => {
		uni.navigateTo({
			url:'/pages/switch/item/addcenter'
		})
	}
	
	// API
	const getInfo = async () => {
		const { data:res } = await getPngApi()
		pngList.value = res.data[0]
	}
	// API
	const getArttrip = async () => {
		const { data:res } = await getcenterApi()
		List.value = res.data.map(item=>{
			return {
				...item,
				img: Object.values(item.img)
			}
		})
	}
	
	onMounted(()=>{
		getInfo()
		getArttrip()
	})
</script>

<style lang="scss" scoped>
	.culture {
		min-height: 100vh;
		padding-bottom: 130rpx;
		.png {
			.img {
				width: 750rpx;
				height: 180rpx;
				background-color: lightskyblue;
			}
		}
		
		.flex {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 15rpx;
			.item {
				display: flex;
				flex-direction: column;
				width: 49%;
				margin-bottom: 20rpx;
				.pic {
					width: 100%;
					background-color: sandybrown;
				}
				.font {
					font-size: 24rpx;
					margin: 15rpx 0;
					padding: 0 15rpx;
				}
				.btm {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 15rpx;
					.left {
						display: flex;
						align-items: center;
						font-size: 20rpx;
						.avtor {
							width: 40rpx;
							height: 40rpx;
							border-radius: 20rpx;
							margin-right: 15rpx;
						}
					}
					.right {
						display: flex;
						align-items: center;
						.icon {
							margin-right: 30rpx;
						}
					}
				}
			}
		}
		
		.fix {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			background-color: $btn1;
			font-weight: bold;
			font-size: 36rpx;
			.word {
				margin-left: 15rpx;
			}
		}
	}
</style>