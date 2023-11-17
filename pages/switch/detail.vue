<template>
	<view class="culturedetail">
		<view class="avator">
			<image src="@/static/picture/img.png" mode="" class="img"></image>
			<text>{{ info?.User?.name }}</text>
		</view>
		
		<view class="swiper">
			<my-swiper :list="info?.img"></my-swiper>
		</view>
		
		<view class="detail">
			<view class="title">{{ info?.title }}</view>
			
			<view class="content">{{ info?.content }}</view>
			
			<view class="time">
				<text>{{ info?.createtime }}</text>
				<text> 编辑</text>
			</view>
		</view>
		
		<view class="ping">
			<view class="input">
				<van-icon name="chat-o" size="50rpx" />
				<view class="bg">
					<input type="text" placeholder="评论点什么吧..." class="text" @confirm="confirm" />
				</view>
			</view>
			
			<view class="list">
				<view class="item" v-for="item in info?.Comment" :key="item.id">
					<view class="avator">
						<image src="@/static/picture/img.png" mode="" class="img"></image>
						<text>{{ item.name }}</text>
					</view>
					<view class="like">
						<text class="words">{{ item.content }}</text>
						<van-icon name="like" color="#ff713c" size="30rpx" />
					</view>
					<view class="time">
						 <text>{{ item.time }}</text>回复
					</view>
				</view>
			</view>
		</view>
		
		<view class="fix">
			<view class="bg">
				<input type="text" placeholder="评论点什么吧..." class="text" @confirm="confirm" />
			</view>
			<view class="sum">
				<view class="item">
					<van-icon @click="addZan" name="like" color="#ff713c" size="30rpx" />
					<text class="num">{{ info?.zan }}</text>
				</view>
				<view class="item">
					<van-icon name="comment-o" size="35rpx" />
					<text class="num">{{ info?.Comment.length }}</text>
				</view>
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import MySwiper from '@/components/nonavto/swiper.vue'
	import { getbyidApi, addPingApi, addZanApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const info = ref()
	const ids = ref(0)
	const loginStore = useLoginStore()
	const utoast =ref()
	
	// 提交输入
	const confirm = (e) => {
		let datas = {
			id: ids.value,
			name: loginStore.userMsg.name,
			content: e.detail.value
		}
		addPing(datas)
	}
	
	onLoad((val)=>{
		ids.value = val.id
		getinfo(ids.value)
	})
	
	// API 
	const getinfo = async (val) => {
		const { data:res } = await getbyidApi(val)
		info.value = res.data
	}
	const addPing = async (data) => {
		const { data:res } = await addPingApi(data)
		utoast.value.show({
			title: '评论成功！',
			type: 'success',
			icon: false
		})
	}
	// 点赞
	const addZan = async () => {
		const {data:res} = await addZanApi(ids.value)
		info.value.zan ++
	}

</script>

<style lang="scss" scoped>
	.culturedetail {
		padding: 0 20rpx 120rpx;
		.avator{
			display: flex;
			align-items: center;
			.img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin-right: 15rpx;
			}
		}
		.swiper{
			margin-top: 10rpx;
			overflow: hidden;
		}
		.detail {
			margin-top: 20rpx;
			.title {
				font-weight: bold;
				font-size: 32rpx;
			}
			.content {
				margin-top: 50rpx;
				.li {
					font-size: 28rpx;
					line-height: 1.6;
				}
			}
			.time{
				display: flex;
				align-items: center;
				color: #9f9f9f;
				margin-top: 30rpx;
			}
		}
		.ping {
			margin-top: 30rpx;
			.input{
				width: 100%;
				display: flex;
				align-items: center;
				.bg{
					background-color: #cccccc;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 30rpx;
					flex: 1;
					padding: 0 30rpx;
					margin-left: 20rpx;
					.text{
						height: 100%;
					}
				}
			}
			.list{
				margin-top: 30rpx;
				.item {
					margin-bottom: 20rpx;
					.like {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						margin: 10rpx 0;
						.words{
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
					.time{
						font-size: 20rpx;
					}
				}
			}
		}
		
		.fix {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			background-color: #fff;
			.bg{
				flex: 1;
				background-color: #cccccc;
				border-radius: 30rpx;
				height: 100%;
				padding: 0 15rpx;
				.text{
					height: 100%;
				}
			}
			.sum {
				display: flex;
				align-items: center;
				.item {
					margin-left: 20rpx;
					display: flex;
					align-items: center;
					.num {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>