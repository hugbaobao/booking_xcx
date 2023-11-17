<template>
	<view class="booking">
		<view class="top">
			<view class="png">
				<text style="margin-left: 20rpx;">{{ `${HotelStore.selectedPrinceInfo?.RoomType?.RoomTypeName} - ${HotelStore.selectedRoom.RoomNumber}` }}</text>
				<image :src="HotelStore.selectedRoom.ImageUris" mode="" class="img"></image>
			</view>
			
			<view class="time">
				<text>{{HotelStore.ArriveTime}} - {{HotelStore.DepartureTime}} 共{{HotelStore.totalDay}}晚</text>
				<text class="color">房间保留至{{HotelStore.ArriveTime}} 19:00</text>
				<text class="sure">请确保入住人姓名与证件一致</text>
			</view>
			
			<view class="phone">
				<text class="left">入住人</text>
				<input class="uni-input" placeholder="请输入姓名" v-model="name" />
			</view>
			
			<view class="phone">
				<text class="left">联系电话</text>
				<input class="uni-input" placeholder="请输入手机号" v-model="setphone" />
			</view>
			
			<view class="bei">
				<text class="left">备选要求</text>
				<input style="flex: 1;" class="uni-input" placeholder="填写房间喜好,入住需求等" v-model="beizhu" />
			</view>
			
		</view>
		
		<view class="huiyuan">
			<view class="jifen">
				<text style="margin-right: 10rpx;">本次入住后可升级为银会员，最多可得719积分</text>
				<van-icon name="question" size="35rpx" />
			</view>
			<view class="tip">
				会员礼遇
			</view>
			<view class="flex">
				<view class="item">
					<text>免费早餐</text>
					<text class="size">每张2份</text>
					<text  class="size" style="margin-top: 20rpx;">无券可用</text>
					<van-checkbox disabled :value="checked1" @change="onChange1" icon-size="36rpx">
					</van-checkbox>
				</view>
				<view class="item">
					<text>免费升房</text>
					<text class="size">视客房情况定</text>
					<text  class="size" style="margin-top: 20rpx;">房型不适用</text>
					<van-checkbox disabled :value="checked2" @change="onChange2" icon-size="36rpx">
					</van-checkbox>
				</view>
				<view class="item">
					<text>延时退房</text>
					<text class="size">最晚至18点</text>
					<text  class="size" style="margin-top: 20rpx;">无券可用</text>
					<van-checkbox disabled :value="checked3" @change="onChange3" icon-size="36rpx">
					</van-checkbox>
				</view>
				<view class="item">
					<text>专属拖鞋</text>
					<text class="size">每张1双</text>
					<text  class="size" style="margin-top: 20rpx;">无券可用</text>
					<van-checkbox disabled :value="checked4" @change="onChange4" icon-size="36rpx">
					</van-checkbox>
				</view>
			</view>
		</view>
		
		<view class="top">
			<view class="bei ant"  @click="showbeiticket = true">
				<text class="left">优惠/免房</text>
				<view class="right">
					<text v-if="HotelStore.ticket !== ''">查看优惠券</text>
					<text v-else>{{HotelStore.ticket}}</text>
					<van-icon name="arrow" />
				</view>
			</view>
			<view class="bei"  @click="showbei = true">
				<text class="left">发票</text>
				<view class="right">
					<text v-if="!HotelStore.iffapiao">如有需要，记得选择发票</text>
					<text v-else>开具发票</text>
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		
		<view class="zc">
			<view class="bold font">
				退订政策
			</view>
			<view class="font">
				当日19:00前未办理入住，酒店有权取消订单；<br />支付完成后，房间将保留至当日19:00；<br />19:00前可免费取消；<br />之后不可取消且无法退款.
			</view>
			<view class="bold font">
				入住政策
			</view>
			<view class="font">
				在线完成支付的订单我们将为您保留房间至当日19:00
			</view>
			<view class="font">
				退房时间为离店当日14:00
			</view>
			<!-- <view class="font">
				为贯彻落实xxxx........................................
			</view> -->
			
		</view>
		
		<view class="pay">
			<view class="left">
				<view class="price">
					￥<text class="size">{{HotelStore.selectedPrinceInfo.OrignPrice}}</text>
				</view>
				<view class="youhui">
					<text>已优惠￥{{HotelStore.selectedPrinceInfo.ActualPrice}}</text>
					<text class="color">账单明细</text>
				</view>
			</view>
			<view class="btn" @click="toidcard">提交订单</view>
		</view>
	
	    <view class="popup">
	    	<van-popup :show="showbeiticket" closeable position="bottom" custom-style="height: 20%;" @close="showbeiticket = false">
				<!-- 弹窗内容 -->
				<view class="popcontent">
					<van-cell v-if="ticket.length !== 0" v-for="(item,index) in ticket" :key="index" :title="item.TemplateName" @click="selectticket(item.Id)" />
					<van-cell value="暂无可用优惠券" />
				</view>
			</van-popup>
			
			<van-popup :show="showbei" closeable position="bottom" @close="showbei = false">
				<!-- 弹窗内容 -->
				<view class="popcontent">
					<van-cell title="开具发票" value="开具发票" @click="selectfp(true)" />
					<van-cell title="不开票" value="不开票" @click="selectfp(false)" />
				</view>
			</van-popup>
	    </view>
	    
	    
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	import { useLoginStore } from '@/stores/login.js'
	import { getSignature } from '@/http/signature.js'
    // 直接导入datetime钩子
	import { datetimer } from '@/hooks/datetime.js'
    import { addOrderApi } from '@/http/getinfo.js'
	import { getPay } from '@/http/pay.js'
	
	
	const utoast =ref()
	const HotelStore = useHotelStore()
	const LoginStore = useLoginStore()
	const MemberId = ref('')  // 会员id
	const ticket = ref([])   // 优惠券
	
	const name = ref('')
	const setphone = ref('')
	const beizhu = ref('')
	
	const checked1 = ref(false)
	const checked2 = ref(false)
	const checked3 = ref(false)
	const checked4 = ref(false)
	
	const showbeiticket = ref(false)  //优惠券
	const showbei = ref(false)
	const beiClose = () => {
		showbei.value = false
	}

	const onChange1 = (event) => {
	    checked1.value = event.detail
    }
	const onChange2 = (event) => {
	    checked2.value = event.detail
	}
	const onChange3 = (event) => {
	    checked3.value = event.detail
	}
	const onChange4 = (event) => {
	    checked4.value = event.detail
	}
	
	// 优惠券选择
	const selectticket = (val) => {
		HotelStore.ticket = val
	}
	// 发票选择
	const selectfp = (val) => {
		showbei.value = false
		HotelStore.iffapiao = val
	}
	
	const toidcard = async () => {
		if(name.value === '') {
			utoast.value.show({
				title: '请输入姓名！',
				type: 'error',
				icon: false
			})
			return
		}
		if(setphone.value === '') {
			utoast.value.show({
				title: '请输入手机号！',
				type: 'error',
				icon: false
			})
			return
		}
		// 已存在身份证号直接提交,否则去填写信息
		if(LoginStore.userMsg.idcard !== '' && LoginStore.userMsg.name === name.value) {
			HotelStore.idcardType = LoginStore.userMsg.idcardtype
			HotelStore.idcard = LoginStore.userMsg.idcard
			HotelStore.name = name.value
			HotelStore.phone = setphone.value === '' ? LoginStore.userMsg.phone : setphone.value
			HotelStore.beizhu = beizhu.value
			// 添加订单
			const result = await HotelStore.getVipInfo()
			if(result.Code === 10000) {
				// 查询订单获取billid 
				findOrder(result.Data)
			} else {
				utoast.value.show({
					title: '订单提交失败！',
					type: 'warning',
					icon: false
				})
			}
		} else {
			uni.navigateTo({
				url:'/pages/input/idcard'
			})
		}
	}
	
	// API 
	// 查询会员
	const getVipInfo = async () => {
		const {data:res1} = await getSignature('Member.GetMemberByOpenId', {openId: LoginStore.keyInfo.openid})
		if(res1.Code === 10000) {
			MemberId.value = HotelStore.MemberId = res1?.Data?.MemberId
			// 查询我的优惠券并导入会员优惠券列表
			const {data:res2} = await getSignature('Coupon.GetMyCoupons', {MemberId: MemberId.value,CouponStatus:'ReadyForUse',PageSize:10,PageIndex:1})
			if(res2.Code === 10000) {
				ticket.value = res2.Data.Content
			}
		}
	}

	
	// 查询订单
	const findOrder = async (val) => {
		const {data:res} = await getSignature('Order.QuerySingleOrder', {
			OrgId: 1206840427889167,
			OrderId: val,
			IncludeOrgInfo: false,
			ExcludeOccupations: false,
			SearchBalance: false
		})
		if(res.Code === 10000) {
			pay(res.Data)
		}
	}
	// 支付
	const pay = async (orderdata) => {
		const { data:res } = await getPay(LoginStore.keyInfo.openid, orderdata.OrderId, HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay)
		// const { data:res } = await getPay(LoginStore.keyInfo.openid, orderdata.OrderId, 0.1)
		uni.hideLoading();
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.package,
			signType: 'MD5',
			paySign: res.paySign,
			success:async (payres)=>{
				console.log('paysuccess', payres);
				// 修改支付状态...
				sendback(orderdata.OrderId)
				paySuccess(orderdata.OrderId.BillId)
				HotelStore.savePayOrder(orderdata)
				uni.showToast({
					title:'支付成功！',
					icon:'success'
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/tabbar/trip'
					})
				},2000)
			},
			fail:(err)=>{
				console.log('fail', err);
				uni.showToast({
					title:'支付失败！',
					icon:"error"
				})
			}
		})
	}
	// 入账
	const paySuccess = async (val) => {
		const {data:res} = await getSignature('Bill.AddBillItem', {
			OrgId: 1206840427889167,
			BillId: val,
			BillItemType: 'Credit',
			SubItemType: 'C9140',
			Amount: HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay,
			PaymentRequest: {}
		})
	}
	
	// 上传后台
	// 上传订单到后台
	const sendback = async (val) => {
		const data = await addOrderApi({
			openid: LoginStore.keyInfo.openid,
			orderid: val,
			price: HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay,
			name: name.value,
			phone: setphone.value,
			idcardtype: HotelStore.idcardType,
			idcard: HotelStore.idcard
		})
	}
	

    onMounted(() => {
		getVipInfo()
		setphone.value = LoginStore.userMsg.phone
	})
</script>

<style lang="scss" scoped>
	.booking {
		min-height: 100vh;
		background-color: #f6f6f6;
		.top {
			background-color: #fff;
			padding: 0 30rpx;
			.png{
				padding: 20rpx 0;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				font-weight: bold;
				border-bottom: 1px solid #f6f6f6;
				.img {
					width: 25%;
					height: 120rpx;
					border-radius: 8rpx;
					overflow: hidden;
					background-color: green;
				}
			}
		}
		
		.time {
			padding: 40rpx 0;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			font-weight: bold;
			border-bottom: 1px solid #f6f6f6;
			font-size: 24rpx;
			line-height: 1.6;
			.color {
				font-size: 20rpx;
				color: #92ccb4;
			}
			.sure {
				font-size: 20rpx;
				margin: 40rpx 0 0;
				color: #898a8c;
				font-weight: 400;
			}
			.name {
				line-height: 1;
				display: flex;
				align-items: center;
				.left {
					display: inline-block;
					width: 200rpx;
					text-align: left;
				}
				.uni-input {
					height: 100%;
				}
			}
		}
		
		.phone {
			border-bottom: 1px solid #f6f6f6;
			height: 80rpx;
			line-height: 80rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			.left {
				display: inline-block;
				width: 200rpx;
				text-align: left;
			}
			.flex {
				display: flex;
				align-items: center;
			}
		}
		
		.bei {
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				display: inline-block;
				width: 200rpx;
				text-align: left;
				font-weight: bold;
			}
			.right {
				color: #898a8c;
				font-weight: 400;
			}
		}
		
		.ant {
			border-bottom: 1px solid #f6f6f6;
			.right{
				color: #92ccb4;
			}
		}
		
		.huiyuan {
			background-color: #fff;
			margin: 15rpx 0;
			padding: 40rpx 30rpx;
			font-weight: bold;
			.jifen {
				display: flex;
			}
			.tip{
				margin-top: 50rpx;
			}
			.flex{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				font-size: 24rpx;
				.item {
					width: 24%;
					color: #bdbebe;
					border: 1px solid #898a8c;
					border-radius: 15rpx;
					padding: 20rpx 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					.size {
						font-size: 20rpx;
					}
				}
			}
		}
	
	    .zc {
			padding: 50rpx 30rpx;
			font-size: 22rpx;
			color: #6b6d6e;
			line-height: 1.8;
			.bold {
				font-size: 24rpx;
				color: #000;
				font-weight: bold;
			}
			.font {
				margin-bottom: 30rpx;
			}
		}
		
		.pay {
			background-color: #fff;
			padding: 20rpx 15rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				display: flex;
				flex-direction: column;
				font-size: 20rpx;
				.price {
					.size {
						font-size: 40rpx;
					}
				}
				.youhui {
					color: #a9abaa;
					.color {
						color: #2d5257;
						margin-left: 10rpx;
					}
				}
			}
			.btn {
				background-color: #464756;
				color: #c2a785;
				height: 80rpx;
				line-height: 80rpx;
				width: 50%;
				text-align: center;
				border-radius: 6rpx;
				font-size: 44rpx;
			}
		}
		.popcontent{
			padding-top: 88rpx;
		}
	}
</style>