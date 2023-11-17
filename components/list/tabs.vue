<template>
	<view class="tabs">
		<!-- 粘性布局,滑动切换,动画 -->
		<van-tabs swipeable sticky animated border @change="tabChange">
		  <van-tab title="全部" name="">
			</van-tab>
		  <van-tab title="有窗" name="有窗">
			</van-tab>
		  <van-tab title="朝阳" name="朝阳">
		  </van-tab>
		  <van-tab title="无烟房" name="无烟房">
		  </van-tab>
		  <van-tab title="大浴缸" name="大浴缸">
		  </van-tab>
		  <van-tab title="安静" name="安静">
		  </van-tab>
		  <van-tab title="木地板" name="木地板">
		  </van-tab>
		</van-tabs>
	</view>
	
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	
	const emits = defineEmits(['attrChange'])
	const attribute = ref('')

    const tabChange = async (val) => {
		attribute.value = val.detail.name === 0 ? '' : val.detail.title
		emits('attrChange', attribute.value)
	}

</script>

<style lang="scss" scoped>
	.tabs {
		// height: 100%;
		background-color: #f6f6f6;
	}
	// 使标签左对齐
	.van-tabs__nav {
		justify-content: flex-start;
	}
</style>