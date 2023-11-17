<template>
	<view v-if="showPrivacy" class="authorization">
		<view class="container">
			<view class="title">用户隐私保护提示</view>
			
			<view class="words">
				我们会按照相关法律法规及<text class="navto" @click="navto">《来颗柚小程序隐私保护指引》</text>遵守正当、合法、必要原则收集和使用您的个人信息。<br/>
				为了向您提供正常的服务，我们会申请收集您的手机号等权限，权限开启后您可以随时通过设置选项关闭权限。如您不同意开启权限，将退出当前小程序。
			</view>
			
			<view class="btncontainer">
					<navigator open-type="exit" target="miniProgram" class="btn">拒绝</navigator>
				<button id="agree-btn"  class="btn" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgreePrivacyAuthorization">同意</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPrivacy: false,
				resolvePrivacyAuthorization: null  // wx.onNeedPrivacyAuthorization的回调handle
			};
		},
		mounted() {
		    wx.onNeedPrivacyAuthorization(resolve => {
				console.log('未授权进入回调');
		      // 需要用户同意隐私授权时
		      // 弹出开发者自定义的隐私授权弹窗
		      this.showPrivacy = true
			  this.resolvePrivacyAuthorization = resolve  // 将首个回调参数赋值给resolvePrivacyAuthorization
		    })
		
		    // 模拟隐私接口调用
		    wx.requirePrivacyAuthorize({
		        success: () => {
				  // 1.当已同意授权时触发
		          // 2.resolve({ event: 'agree', buttonId: 'agree-btn' }) 时触发
				  
		          // 继续小程序逻辑
				  console.log('同意隐私授权，关闭弹窗，进行下一步授权');
				  // this.$emit('agree')
		        },
		        fail: () => {
				     // resolve({ event: 'disagree' })时触发fail
				    console.log('用户拒绝授权,关闭弹窗');
					// this.$emit('refuse')
			    }, 
		        complete: () => {
				    this.showPrivacy = false
			    }
		    })
		  },
		  methods:{
			handleAgreePrivacyAuthorization() {
			    // 用户点击同意按钮后触发
			    this.resolvePrivacyAuthorization({
			        buttonId: 'agree-btn',  
			        event: 'agree'  
			    })
			},
			disagree() {
			    // 用户拒绝授权
				this.resolvePrivacyAuthorization({ event: 'disagree' })
			},
			navto() {
				wx.openPrivacyContract({
				  success: () => {}, // 打开成功
				  fail: () => {}, // 打开失败
				  complete: () => {}
				})
			}
		  }
	}
</script>

<style lang="scss">
	.authorization {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.7);
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		color: #585858;
		padding-bottom: 200rpx;
		z-index: 999;
		.container {
			background-color: #fff;
			border-radius: 30rpx;
			width: 550rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 40rpx;
			.title{
				font-size: 40rpx;
			}
			.words {
				font-size: 28rpx;
				line-height: 1.8;
				margin: 20rpx 0;
				.navto {
					color: #003f78;
				}
			}
			.btncontainer {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				.btn {
					margin: 0;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 40rpx;
					border: none;
					padding: 0 70rpx;
					background-color: #f6f6f6;
					color: #585858;
					font-size: 28rpx;
					&::after {
						border: none;
					}
					&:last-child {
						color: #fff;
						background-color: #003f78;
					}
				}
			}
		}
	}
</style>
