<template>
	<view class="big_box">
		<u-popup v-model="show" mode="center" border-radius="14">
			<view class="opened">此页面需要登录查看，即将跳转到登录页面</view>
		</u-popup>
	</view>
</template>

<script setup>
	import { onReady } from '@dcloudio/uni-app'
	import { useLoginStore } from '@/stores/login.js'
    import { ref, watchEffect } from "vue";
	
	const show = ref(false)
	const Login = useLoginStore()

	
	watchEffect(()=>{
		if(Login.isLogin === false) {
			show.value = true
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},2000)
		}else {
			show.value = false
		}
		 
	})
	
	onReady(()=>{
		
	})
	
</script>

<style scoped lang="scss">
	.big_box{
		.opened{
			// line-height: 200rpx;
			padding: 30rpx 20rpx;
		}
	}
</style>