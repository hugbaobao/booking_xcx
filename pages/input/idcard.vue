<template>
	<view class="idcard">
		<view class="fff">
			<view class="item">
				  <van-field
				    label="姓名"
				    :value="name"
				    placeholder="与证件名称保持一致"
				    border="{{ false }}"
				    @blur="onNameChange"
				  />
			</view>
			
			<!-- 1 -->
			<view class="item">
				<view class="sheet" @click="show = true">
					<text>证件类型</text>
					<view class="right">
						<text class="font">{{ cardname }}</text>
						<van-icon name="arrow" />
					</view>
				</view>
				<van-action-sheet
				  :show="show"
				  :actions="actions"
				  @close="onClose"
				  @select="onSelect" 
				/>
			</view>
			
			<view class="item">
				  <van-field
				    label="证件号码"
				    :value="card"
				    placeholder="与证件号码保持一致"
				    border="{{ false }}"
				    @blur="onCardChange"
				  />
			</view>
		</view>
		
		<view class="font">
			<view class="part">
				依据《旅游业治安管理办法》，用户入住时须提供身份证信息，用于亚朵对入住人身份进行查验并登记，以确保入住人和证件信息一致性。
			</view>
			<view class="part">
				本次收集您的身份证信息，是为了与线下入住酒店时提供的身份证信息做匹配，防止黄牛恶意刷单，以维护您的新客权益。
			</view>
			<view class="part">
				如您不提供身份信息，将无法享受新客权益，但不影响您的其他权益。
			</view>
			<view class="part">
				填写后身份信息会同步至会员信息。
			</view>
		</view>
		
		<view class="btn">
			<view class="check">
				<van-checkbox
				  :value="check"
				  checked-color="#07c160" 
				  icon-size="40rpx"
				  @change="check = !check"
				>
				  复选框
				</van-checkbox>
				<view class="text">
					勾选并提交表示完全接受<text class="font" @click="toIdcard">身份证件使用协议</text>
				</view>
			</view>
			
			<view class="button">
				<u-button :hair-line="false" type="success" :disabled="!canSub" @click="submit">提交</u-button>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	import { useLoginStore } from '@/stores/login.js'
	import { getSignature } from '@/http/signature.js'
	import { saveIdcardApi } from '@/http/getinfo.js'
	
	const HotelStore = useHotelStore()
	const LoginStore = useLoginStore()
	console.log(HotelStore.selectedRoom);
	const name = ref('')     // 姓名
	const card = ref('')     // 证件号码
	const type = ref('C01')     // 证件类型
	const cardname = ref('身份证')     // 证件名称
	const check = ref(false)
	const show = ref(false)  
	const actions = ref([
      {
        name: '身份证',
		value: 'C01'
      },
      {
        name: '护照',
		value: 'C53'
      },
      {
        name: '台湾居民来往大陆通行证',
		value: 'C55'
      },
      {
        name: '港澳居民来往内地通行证',
		value: 'C62'
      }
    ])
	
	const onClose = () => {
      show.value = false
    }
    const onSelect = (event) => {
      type.value = event.detail.value
      cardname.value = event.detail.name
    }
	
	const onNameChange = (event) => {
	  name.value = event.detail.value
	}
	const onCardChange = (event) => {
      card.value = event.detail.value
    }
	
	const canSub = computed(()=>{
		return name.value !=='' && card.value !=='' && check.value
	})
	
	const toIdcard = () => {
		uni.navigateTo({
			url:'/pages/agreement/idcard'
		})
	}
	
	const submit = async() => {
		// 保存到数据库和store
		HotelStore.idcardType = LoginStore.idcardtype = type.value
		HotelStore.idcard = LoginStore.idcard = card.value
		HotelStore.name = name.value
		saveIdcard()
		uni.navigateBack()
	}
	
	// API 
	const saveIdcard = async () => {
		const { data:res } = await saveIdcardApi(LoginStore.keyInfo.openid, {
			idcard: card.value,
			idcardtype: type.value,
			name: name.value
		})
	}
</script>

<style lang="scss" scoped>
	.idcard {
		min-height: 100vh;
		background-color: #f6f6f6;
		.fff {
			background-color: #fff;
			padding:  0 30rpx;
			.item {
				&:nth-child(2) {
					height: 88rpx;
					line-height: 88rpx;
					padding: 0 32rpx;
					color: #646566;
				}
				.sheet {
					height: 100%;
					border-bottom: 1px solid #f5f6f7;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.right {
						display: flex;
						align-items: center;
						.font{
							font-size: 24rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
		
		.font {
			padding: 15rpx 30rpx;
			font-size: 24rpx;
			line-height: 1.5;
			color: #63676a;
			.part {
				margin-bottom: 20rpx;
			}
		}
		
		.btn {
			font-size: 24rpx;
			.check {
				display: flex;
				align-items: center;
				overflow: hidden;
				padding: 0 30rpx;
				.text {
					.font{
						display: inline-block;
						line-height: 1;
						color: #45827c;
						padding: 0;
					    border-bottom: 1px solid #45827c;
					}
				}
			}
			.button {
				padding: 0 30rpx;
				margin-top: 50rpx;
			}
		}
	}
</style>