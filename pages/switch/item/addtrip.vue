<template>
	<view class="addtrip">
		<u-form :model="form" ref="form1">
			
			<u-form-item label="标题" prop="name"><u-input v-model="form.title" /></u-form-item>
			
			<u-form-item label="简介" prop="intro"><u-input type="textarea" v-model="form.content" /></u-form-item>
			
			<u-form-item label="上传">
				<u-upload ref="uUpload" :auto-upload="false" :max-count="3"></u-upload>
			</u-form-item>
		</u-form>
	
		<button @click="submit">立即发布</button>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script>
	import { ref,onMounted } from 'vue'
	import { onReady } from '@dcloudio/uni-app'
	import { arttripApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	
	const loginStore = useLoginStore()
	
	export default {
		data(){
			return {
				form: {
	            	title: '',
	            	content: '',
	            	img: []
	            }
			}
		},
		methods:{
			submit(){
				let that = this
				let imgList = this.$refs.uUpload.lists
				// 将选择的图片上传到服务器，自定义上传
				imgList.forEach((item) => {
				  uni.uploadFile({
				    url: 'http://127.0.0.1:8000/uploadimg/ulo', // 服务器地址
				    filePath: item.url,
				    name: 'img', // 文件名
				    type: 'image/jpeg', // 文件类型
				    header: {
				      'content-type': 'application/x-www-form-urlencoded'
				    },
				    success(res) {
						let path = `http://127.0.0.1:8000${JSON.parse(res.data).data.url}`
				        that.form.img.push(path)
				    },
				    fail(err) {
				      console.log(err);
				    }
				  });
				});
				this.addtrip(this.form)
			},
			
			// API 
			async addtrip(val){
				const {data:res} = await arttripApi({
					openid: loginStore.keyInfo.openid,
					data: val
				})
				if(res.code === 200) {
					this.$refs.utoast.show({
						title: '提交成功！等待审核',
						type: 'success',
						icon: false
					})
					uni.navigateBack()
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.addtrip {
		padding: 40rpx 30rpx;
	}
</style>