<template>
	<view class="big_box">
		<view class="topbox">
			个人资料设置
		</view>
		
		<view class="formbox">
			<view class="form_item">
				<view class="label">
					昵称
				</view>
				<input type="text" v-model="info.name" class="inputs">
			</view>
			<view class="form_item">
				<view class="label">
					性别
				</view>
				<radio-group @change="sexchange" class="radio inputs">
					<label>
						<radio value="男" :checked="info.sex=='男'?true:false"/><text>男</text>
					</label>
					<label>
						<radio value="女" :checked="info.sex=='女'?true:false"/><text>女</text>
					</label>
				</radio-group>
			</view>
			<view class="form_item">
				<view class="label">
					手机号码
				</view>
				<input type="tel" v-model="info.phone" class="inputs">
			</view>
			<view class="form_item">
				<view class="label">
					邮寄地址
				</view>
				<textarea v-model="info.address" placeholder="请输入详细地址" class="textarea"></textarea>
			</view>
		</view>
		<button @click="saveInfo" class="button">保存</button>
	</view>
	
	<my-intercept></my-intercept>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useLoginStore } from '@/stores/login.js'
	import MyIntercept from '@/components/intercept/intercept.vue'
	import { updataUserApi } from '@/http/getinfo.js'
	
	const Login = useLoginStore()
	
	const info = ref({
		avator: '',
		phone: '',
		name: '',
		address: '',
		sex: '男'
	})
	
	watchEffect(() => {
		info.value = Login.userMsg
	})
	
	const sexchange = (e) =>{
		info.value.sex = e.detail.value
	}
	
	const saveInfo = async () => {
		if(info.value.name.length > 5){
			uni.showToast({
				title:'姓名输入有误',
				icon:"error"
			})
		}
		uni.showLoading({
			title: '正在提交'
		});
		await saveUserInfo(info.value)
		Login.saveInfo(info.value)
		uni.hideLoading();
		uni.showToast({
			icon:'success',
			title:'保存成功'
		})
		uni.navigateBack()
	}
	
	// API 
	const saveUserInfo = async (val) => {
		const res = await updataUserApi({
			openid: Login.keyInfo.openid,
			data: val
		})
	}

</script>

<style scoped lang="scss">
	.big_box{
		background-color: #f7f8fc;
		padding-bottom: 36rpx;
		.topbox{
			width: 100%;
			height: 340rpx;
			background-color: #2ecece;
			text-align: center;
			line-height: 340rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
		}
		
		.formbox{
			width: 670rpx;
			margin: 38rpx auto;
			background-color: #FFF;
			border-radius: 20rpx;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			.form_item{
				font-size: 26rpx;
				min-height: 100rpx;
				display: flex;
				align-items: center;
				line-height: 100rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #f3f3f3;
				padding: 16rpx 20rpx 0 20rpx;
				.label{
					width: 168rpx;
				}
				.radio{
					display: flex;
					align-items: center;
					// justify-content: flex-end;
					>label{
						margin-left: 10rpx;
					}
				}
				.inputs {
					flex: 1;
					height: 100%;
					line-height: 100%;
				}
				.textarea {
					flex: 1;
					min-height: 100%;
					line-height: 100%;
				}
			}
		}
		.button{
			width: 674rpx;
			height: 88rpx;
			background-color: #2ecece;
			color: #FFF;
			margin: 36rpx;
			font-size: 36rpx;
			line-height: 88rpx;
		}
	}
</style>