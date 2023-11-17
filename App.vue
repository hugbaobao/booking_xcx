<script>
	import { getRoom } from '@/http/wxapi.js'
	import { useLoginStore } from '@/stores/login.js'
	import { getUserApi, getCarApi } from '@/http/getinfo.js'
	import { watchEffect } from 'vue'
	
	const getOpenid = (val) =>{
		return getRoom(val)
	}
	
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			const Login = useLoginStore()
			uni.login({
			  provider: 'weixin', //使用微信登录
			  success: async function (loginRes) {
				  if(loginRes.errMsg === 'login:ok') {
					  // 利用code换取openid
					  const nodedata = await getRoom(loginRes.code)
					  if(nodedata.errMsg === 'request:ok') {
						Login.saveKeyInfo(nodedata.data)
						const { data:res } = await getUserApi(nodedata.data.openid)
						// console.log(111, res);
						if(res.data !== null) {
							// 将获取的信息保存到store
							Login.userMsg.phone = res.data.phone
							Login.userMsg.name = res.data.name
							Login.userMsg.address = res.data.address
							Login.userMsg.sex = res.data.sex
							Login.userMsg.idcard = res.data.idcard
							Login.userMsg.idcardtype = res.data.idcardtype
							Login.userMsg.vip = res.data.vip
							Login.userMsg.integral = res.data.integral
							Login.loginStateChange(true)
							Login.Receive = res.data.Receive
						}
					  }
					  const { data:res }  = await getCarApi(Login.keyInfo.openid)
					  if(res.code === 200) {
						  Login.getOrder(res.data)
					  }
				  }
			  }
			});
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url('style/init.css');
	/* ui库样式 */
	@import "./uni_modules/vk-uview-ui/index.scss";
	// 覆盖ui库样式
	@import "./style/cover.scss";
	
	@import url('/wxcomponents/vant/common/index.wxss');
	
	// iconfont 
	@import "./static/icon/iconfont.css"
</style>
