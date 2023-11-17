<template>
	<view class="switch_article">
		<view class="item" v-for="item in List" :key="item.id" @click="toDetail(item.id)">
			
			<view class="content">
				<text class="title">{{ item.title }}</text>
				<view class="words">{{ item.content }}</view>
				<view class="time">
					<text>{{ item.createtime }}</text>
					<view class="icon">
						<van-icon name="like" color="#ff713c" size="30rpx" />
						<van-icon name="comment-o" size="35rpx" class="righticon" />
					</view>
				</view>
			</view>
			
			<view class="png">
				<image :src="item.img[0]" mode="" class="img"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { getArttripApi } from '@/http/getinfo.js'
	
	const List = ref([])
	const toDetail = (val) => {
		uni.navigateTo({
			url:'/pages/switch/detail?id=' + val
		})
	}
	
	// API
	const getArttrip = async () => {
		const { data:res } = await getArttripApi()
		List.value = res.data.map(item=>{
			return {
				...item,
				img: Object.values(item.img)
			}
		})
	}
	
	onMounted(()=>{
		getArttrip()
	})

</script>

<style lang="scss" scoped>
	.switch_article {
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.png {
				width: 160rpx;
				height: 160rpx;
				// border: 1px solid #a1a1a1;
				border-radius: 10rpx;
				overflow: hidden;
				.img {
					width: 160rpx;
					height: 160rpx;
				}
			}
			.content{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: space-around;
				padding: 0 20rpx;
				.title {
					width: 100%;
					font-weight: bold;
					font-size: 32rpx;
				}
				.words {
					width: 100%;
					color: #a1a1a1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.time{
					color: #a1a1a1;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					margin-top: 10rpx;
					.icon {
						display: flex;
						align-content: center;
						.righticon {
							margin-left: 30rpx;
						}
					}
				}
			}
		}
	}
</style>