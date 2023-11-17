<template>
	<view class="login">
		<view class="button">
			<view>
				<button class="btntop" open-type="getPhoneNumber" @getphonenumber='register'>一键登录</button>
			</view>
			<button class="btnbtm" @click="gotoindex">暂不登录</button>
		</view>
		<view class="radio">
			<radio @click="radiochange" :checked="checked" /><text>我同意并遵守《注册服务协议》</text>
		</view>	
	</view>
	
	<!-- <my-mixin @agree="agreemixin" @refuse="noagree"></my-mixin> -->
</template>

<script setup>
	import { ref } from 'vue'
	import { getPhoneApi } from '@/http/wxapi.js'
	import { getUserApi, addUserApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	import MyMixin from '@/components/mixin/mixin.vue'
	
	const checked = ref(false)
	const loginStore = useLoginStore()
	
	const gotoindex = () => {
		uni.switchTab({
			url:'/pages/tabbar/room'
		})
	}
	const radiochange = () => {
		checked.value = !checked.value
	}
	const register = (value) => {
		if(!checked.value) {
			uni.showToast({
				icon:'error',
				title:'未同意协议！'
			})
			return
		}
		if(value.detail.errMsg == 'getPhoneNumber:ok'){
			let msg = {
				session_key:loginStore.keyInfo.session_key,
				encrypteddata:value.detail.encryptedData,
				iv:value.detail.iv
			}
			getPhone(msg)
		}
	}
	
	const agreemixin = ()=>{
		console.log('agree');
	}
	const noagree = ()=>{
		uni.switchTab({
			url:'/pages/tabbar/room'
		})
	}
	
	// API 
	const getPhone = async (val) => {
		const res = await getPhoneApi(val)
		if(res.data.phoneNumber) {
			// 根据openid查询,无则新增,有则修改store
			findById(loginStore.keyInfo.openid, res.data.phoneNumber)
		}
		loginStore.loginStateChange(true)
		uni.navigateBack()
	}
	
	const findById = async (openid, phone) => {
		const { data:res } = await getUserApi(openid)
		if(res.data === null) {
			await addUserApi({
				openid: openid,
				phone: phone
			})
			loginStore.savePhone(phone)
		} else {
			loginStore.userMsg.phone = res.data.phone
			loginStore.userMsg.name = res.data.name
			loginStore.userMsg.address = res.data.address
			loginStore.userMsg.sex = res.data.sex
		}
	}
</script>

<style scoped lang="scss">
	.login{
		background-color: #f5f6f8;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.button{
			width: 456rpx;
			height: 268rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.btntop{
				width: 100%;
				background-color: #017aff;
				border-radius: 10rpx;
			}
			.btnbtm{
				width: 100%;
				background-color: green;
				border-radius: 10rpx;
			}
		}
		.radio{
			font-size: 30rpx;
			color: #8f8f8f;
			margin-top: 30rpx;
			radio{
				transform:scale(0.7);
				position: relative;
				top: -2rpx;
			}
		}
	}
</style>