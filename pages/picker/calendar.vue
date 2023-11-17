<template>
<view class="container">
	<!-- 周一至周日 -->
	<view class="week">
		<view v-for="(item,index) in weekList" :class="{sunDay:index==0}" :key="index">{{item.title}}</view>
	</view>
	<!-- 日期的显示容器 -->
<scroll-view scroll-y="true" class="dateView" :scroll-top="scrollTop">
	
	<view class="date" v-for="(item,index) in dateList" :key="index">
		<view class="yearAndMonth" :id="'yearAndMonth'+index">{{item.year}}年{{item.month}}月</view>
		<view class="dayList">
			<view v-for="(day,No) in item.dayArray" @click="chooseDate(item.year,item.month,day,item.dayArray,index,No)" :class="['day',dealClassStyle(item.year,item.month,day)]" :key="No">
				<view class="startDate1" >
				
				    <view class="today" v-if="dealTimeString(`${item.year}/${item.month}/${day.num}`)==dealTimeString(today)">
				    	<view>今天</view>
				    </view>
				    			
				    <view class="star" v-if="dealTimeString(`${item.year}/${item.month}/${day.num}`)==startTimeString">
				    	<view>入住</view>
				    </view>
				    
				    <view 
				    class="end" 
				    :class="{same:endTimeString==startTimeString}" 
				    v-if="dealTimeString(`${item.year}/${item.month}/${day.num}`)==endTimeString"
				    >
				    	<view>离店</view>
				    </view>
				    
				    <view v-if="dealTimeString(`${item.year}/${item.month}/${day.num}`)==startTimeString && day.status==1 ">
				    	
				    </view >
				    <view v-else-if ="dealTimeString(`${item.year}/${item.month}/${day.num}`)==endTimeString&& day.status==1">
				    	
				    </view>
				    <view v-else>
				        <view class="yiman" v-if="day.status==1">
				        	<view >已满</view>
				        </view>
				    </view >
				    <view v-if="seleStaAend == 1 && seleSta ==0">
				    	<view class="yiman" v-if="day.status==1">
				    		<view >已满</view>
				    	</view>
				    </view>
		            <!-- 日期号 -->
				    <view>{{day.num}}</view>
				</view>
				
			</view>
		</view>
	</view>
</scroll-view>
</view>

</template>

<script setup>
// import { getAllDate } from "@/hooks/AllDate.js"
import { ref, computed, watch, onMounted } from 'vue';
import { onReady } from '@dcloudio/uni-app'
import { useHotelStore } from '@/stores/hotel.js'

const HotelStore = useHotelStore()

const seleSta = ref(0);
const seleStaAend = ref(0);
const seleyiman = ref(0);
const yimanArray = ref([]);
const timeArr = ref([]);
const startday0 = ref('');
const endday0 = ref('');
const startweek0 = ref('');
const endweek0 = ref('');
const dayNum1 = ref(0);
const startindex1 = ref(0);
const startindex2 = ref(0);
const endindex1 = ref(0);
const endindex2 = ref(0);
const startTimeString = ref(0);
const endTimeString = ref(0);
const weekList1 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const weekList = [{
					title: '日',
					index: 0
				}, {
					title: '一',
					index: 1
				}, {
					title: '二',
					index: 2
				}, {
					title: '三',
					index: 3
				}, {
					title: '四',
					index: 4
				}, {
					title: '五',
					index: 5
				}, {
					title: '六',
					index: 6
}]
const dateList = ref([])	

const limit = 3;
const today = ref('');
const year = ref(0);
const month = ref(0);
const week = ref(0);
const day = ref(0);
const todayTimeString = ref(0);
const currtag = ref(0);
const scrollTop = ref(0);
const startDate = ref('');
const endDate = ref('');
const time = ref('');

onMounted(() => {
	uni.getStorage({
		key: '满房日期显示',
		success: function(res) {
			if (res.data == 1) {
				uni.getStorage({
					key: '满房日期',
					success: function(res) {
						yimanArray.value = res.data;
					}
				});
			}
		}
	});
	init()
});


// 初始化
const init = () => {
	ajaxDate()					//先处理当天的日期
	dealStarAndEndDay()		//处理传入参数
	//dealman2() //开始时候和结束时间是否都是已满的
	dealDateList()				//处理出最终渲染数据
	//let array = getAllDate(startDate.value, endDate.value);//判断选择日期是否有已满日期 如果满了就清空选择状态
	//console.log(startDate.value, endDate.value);
	//let sta = dealman3(array);
	//  if(sta ==1){
	// 	 startTimeString.value ='';
	// 	 endTimeString.value = '';
	//  }
}

// 确认选择时间
const confirmChoose = () => {
const reg = /\S/;														//非空正则
	if(reg.test(startTimeString.value) && reg.test(endTimeString.value)){	//判断始与结束时间不为空方能导出时间并调取selectDate传参事件
		const startDate = dealDate(startTimeString.value)
		const endDate = dealDate(endTimeString.value)
		
		const startDate1 = dealDate1(startTimeString.value)
		const endDate1 = dealDate1(endTimeString.value)
		const dayNum = ((endTimeString.value - startTimeString.value)/1000/3600/24)
		
		const man = dealman(startDate); //已满
		const man01 = dealman(endDate); //已满
		if(man == 1 && man01 == 1){
			
			uni.showToast({
				title:"你选择了的房间已满 请重新选择",
				icon:'none'
			})
			return
		}
		if(dayNum < 1){
			uni.showToast({
				title:"请选择离店日期",
				icon:'none'
			})
			return
		}
	
		// 此处调用传参 ：开始和结束日期的两种格式，还有选择日期的天数
	// uni.navigateBack({
	// 	fail() {
	// 		uni.switchTab({
	// 			url:'/pages/tabbar/room'
	// 		})
	// 	}
	// })
		// this.$emit('selectDate',{startDate:startDate,endDate:endDate,startDate1:startDate1,endDate1:endDate1,dayNum:dayNum + 1})
	// console.log(startDate,endDate,startDate1,endDate1,dayNum + 1);
	// return
	HotelStore.ArriveTime = startDate
	HotelStore.DepartureTime = endDate
	HotelStore.totalDay = dayNum + 1
	uni.navigateBack()
	}else{
		uni.showModal({
			title:'提示',
			content:`尚未选择时间`
		})
	}
}


// 选择开始结束日期
const chooseDate = (year, month, day, dayarray, index1, index2) => {
	let time = `${year}/${month}/${day.num}`
	let timeString = new Date(time).getTime()
	seleyiman.value = 1;
	seleSta.value = 1;
	let man = day.status;  //已满 1为已满
	man = dealman1(timeString, man);
	if (startTimeString.value == '') {
		man = day.status;
	}
	if (man == 1) {
		uni.showToast({
			title: "不能选择已住满的房间",
			icon: 'none'
		})
		seleyiman.value = 0;
		return
	}
	seleyiman.value = 0;
	if (timeString >= todayTimeString.value) {  //选择的时间必须大于等于今天，过期时间不给选择
		if (timeArr.value.length === 1) {
			// console.log('第二次选择');
			let dic = {
				time: timeString,
				index1: index1,
				index2: index2,
			}
			timeArr.value.push(dic)
			startTimeString.value = timeArr.value[0].time
			let time0 = timeArr.value[0];
			let time1 = timeArr.value[1];
			if (time0.time < time1.time) {        //若是[0]小于[1]
				startTimeString.value = time0.time      //则[0]为开始时间
				endTimeString.value = time1.time      //[1]为结束时间
				startindex1.value = time0.index1;
				startindex2.value = time0.index2;
				endindex1.value = time1.index1;
				endindex2.value = time1.index2;
			} else if (time0.time > time1.time) {      //若是[0]大于[1]
				startTimeString.value = time1.time      //则[1]为开始时间
				endTimeString.value = time0.time      //[0]为结束时间
				endindex1.value = time0.index1;
				endindex2.value = time0.index2;
				startindex1.value = time0.index1;
				startindex2.value = time0.index2;
			} else if (time0.time == time1.time) {
				startTimeString.value = time0.time
				endTimeString.value = time1.time
				startindex1.value = index1;
				startindex2.value = index2;
				endindex1.value = index1;
				endindex2.value = index2;
			}
			// 第二次选择结束
			confirmChoose()
		} else {
			//第一次选择
			// console.log('第一次选择');
			let dic = {
				time: timeString,
				index1: index1,
				index2: index2,
			}
			timeArr.value.push(dic)
			startTimeString.value = timeArr.value[0].time
			endTimeString.value = timeArr.value[0].time
			startindex1.value = index1;
			startindex2.value = index2;
			endindex1.value = index1;
			endindex2.value = index2;
		}
		if (startindex1.value == endindex1.value) {
			let kaishiarray1 = dayarray.slice(startindex2.value, endindex2.value + 1);
			dealshow1(year, month, timeString, kaishiarray1, index1, index2); ////判断选中的是否有 （已满）房间
		} else {
			for (let i = startindex1.value; i <= endindex1.value; i++) {
				let kaidic = dateList.value[i];
				//判断选中的是否有 （已满）房间
				dealshow1(kaidic.year, kaidic.month, timeString, kaidic.dayArray, index1, index2);
			}
		}
		//dealshow(); //处理 头部显示  入住日期 离店日期
	} else {
		uni.showToast({
			title: "选择日期不能小于当天！",
			icon: 'none'
		})
	}
}

const dealStarAndEndDay = () => {
	//若有传开始时间，则处理出开始时间的时间戳，
	if (startDate.value) {
		startTimeString.value = new Date(startDate.value).getTime()
	} else {
		// startTimeString的值为当前时间的时间戳
		startTimeString.value = new Date(todayTimeString.value).getTime()
	}
	//若有传结束时间，则处理出结束时间的时间戳，
	if (endDate.value) {
		endTimeString.value = new Date(endDate.value).getTime()
	} else {
		// endTimeString的值为当前时间的时间戳
		endTimeString.value = new Date(todayTimeString.value).getTime()
	}
	dealshow();
}

const dealDateList = () => {
			let start;
			let start1 = startDate.value.replace('/', '-');
			const year1 = new Date(start1).getFullYear();
			const month1 = new Date(start1).getMonth() + 1;
			const year2 = `${year1}/${month1}`;
			start = today.value;
			let year = new Date(start).getFullYear();
			let month = new Date(start).getMonth();
			let year22 = `${year}/${month}`;
			for (let i = 0; i < limit; i++) {
				month++;
				if (month > 12) {
					month = month - 12;
					year = year + 1;
				}
				const year22 = `${year}/${month}`;
				if (year22 == year2) {
					currtag.value = i;
				}
				dateList.value.push({
					year: year,
					month: month,
					dayArray: dealDateArray(year, month)
				});
			}
			// console.log(dateList.value);
};
const dealDateList1 = () => {
			let start;
			start = '2022/10/08';
			const year = new Date(start).getFullYear();
			let month = new Date(start).getMonth() + 3;
			for (let i = 3; i < limit; i++) {
				month++;
				if (month > 12) {
					month = month - 12;
					year = year + 1;
				}
				dateList.value.push({
					year: year,
					month: month,
					dayArray: dealDateArray(year, month)
				});
			}
};
const dealDateArray = (year, month) => {
			const big = [1, 3, 5, 7, 8, 10, 12];
			let type;
			let dayNum;
			const dayArray = new Array();
			if ((year % 100 != 0 && year % 4 == 0 && year % 4 != 0) || (year % 100 == 0 && year % 400 == 0)) {
				type = 0;
			} else {
				type = 1;
			}
			if (big.includes(parseInt(month))) {
				dayNum = 31;
			} else {
				if (month == 2) {
					if (type == 0) {
						dayNum = 29;
					} else {
						dayNum = 28;
					}
				} else {
					dayNum = 30;
				}
			}
			// const No = new Date(`${year}/${month}`).getDay();
			// for (let i = 0; i < No; i++) {
			// 	const dic = {
			// 		num: '',
			// 		status: 0
			// 	};
			// 	dayArray.unshift(dic);
			// }
			for (let i = 1; i <= dayNum; i++) {
				const time1 = `${year}/${month}/${i}`;
				const status = dealman(time1);
				const dic = {
					num: Number(i.toString().length === 1 ? '0' + i : i),
					status: status
				};
				dayArray.push(dic);
			}
	return dayArray;
};

// 处理返回事件戳 用于数据对比，展示开始 结束 标签
const dealTimeString = (time) => {
	if (isNaN(Date.parse(time))) {
		time = time.replace(/-/g, '/');
	}
	return new Date(time).getTime();
};

// 获取当日的 年-月-日
const ajaxDate = () => {
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
			const week = date.getDay();
	    let day = date.getDate();
	    day = day < 10 ? `0${day}` : day;
			today.value = `${year}/${month}/${day}`;
			todayTimeString.value = new Date(`${year}/${month}/${day}`).getTime();
};

// 通过对比处理日期的时间戳返回样式的类名 天数
const dealClassStyle = (year, month, day) => {
	if (day.num) { //day必须存在，为空字符串不处理
		let time = `${year}/${month}/${day.num}`;
		let timeString = new Date(time).getTime();
		let man = day.status; //已满 1为已满
		if (seleSta.value === 1) {
			man = dealman1(timeString, man);
		}
		if (man === 1) {
			if (seleStaAend.value === 1) {
				return 'overdue';
			} else {
				if (timeString === startTimeString.value) { //时间戳等于开始时间时间戳
					return 'startDate';
				} else if (timeString === endTimeString.value) { //时间戳等于结束时间时间戳
					return 'endDate';
				} else {
					return 'overdue';
				}
			}
		} else if (timeString === startTimeString.value) { //时间戳等于开始时间时间戳
			return 'startDate';
		} else if (timeString === endTimeString.value) { //时间戳等于结束时间时间戳
			return 'endDate';
		} else if (timeString > startTimeString.value && timeString < endTimeString.value) { //大于开始时间时间戳并小于结束时间时间戳的范围
			return 'scope';
		} else if (timeString === todayTimeString.value) { //今天
			return 'toDay';
		} else if (timeString < todayTimeString.value) { //过期时间
			return 'overdue';
		}
	}
}
		const dealTime = (timeString, todayTimeString, day) => {
			let man = day.status; //已满 1为已满
			if (seleSta.value == 1) {
				man = dealman1(timeString, man);
			}
			if (man == 1) {
				if (seleStaAend.value == 1) {
					return 'overdue';
				} else {
					if (timeString == startTimeString.value) { //时间戳等于开始时间时间戳
						return 'startDate';
					} else if (timeString == endTimeString.value) { //时间戳等于结束时间时间戳
						return 'endDate';
					} else {
						return 'overdue';
					}
				}
			} else if (timeString == startTimeString.value) { //时间戳等于开始时间时间戳
				return 'startDate';
			} else if (timeString == endTimeString.value) { //时间戳等于结束时间时间戳
				return 'endDate';
			} else if (timeString > startTimeString.value && timeString < endTimeString.value) { //大于开始时间时间戳并小于结束时间时间戳的范围
				return 'scope';
			} else if (timeString == todayTimeString) { //今天
				return 'toDay';
			} else if (timeString < todayTimeString) { //过期时间
				return 'overdue';
			}
		};
		const dealDate = (time = '') => {
			const date = new Date(time);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			return `${year}/${month}/${day}`;
		};
		const dealDate1 = (time = '') => {
			const date = new Date(time);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			return `${month}月${day}日`;
		};
		const dealman = (e) => {
			const show1 = uni.getStorageSync('满房日期显示');
			if (show1 == 1) {
				const array = yimanArray.value;
				for (let i = 0; i < array.length; i++) {
					const name1 = array[i];
					if (name1 == e) {
						let man = 1;
						if (seleSta.value == 1) {
							man = dealman1(e, man);
						}
						return man;
					}
				}
			}
		};
		const dealman1 = (timeString, man) => {
			let man01 = man;
			const timeString1 = new Date(timeString).getTime();
			let end = endTimeString.value;
			if (seleyiman.value == 1) {
				end = timeString1;
			}
			if (timeString1 == end) {
				if (end > startTimeString.value) {
					man01 = 0;
				}
			}
			return man01;
		};
		// const dealman2 = (e) => {
		// 	const show1 = uni.getStorageSync('满房日期显示');
		// 	if (show1 == 1) {
		// 		let man00 = 0;
		// 		let man01 = 0;
		// 		const array = yimanArray.value;
		// 		for (let i = 0; i < array.length; i++) {
		// 			const name1 = array[i];
		// 			const timeString1 = new Date(name1).getTime();
		// 			if (timeString1 == startTimeString.value) {
		// 				man00 = 1;
		// 			}
		// 			if (timeString1 == endTimeString.value) {
		// 				man01 = 1;
		// 			}
		// 		}
		// 		if (man00 == 1 && man01 == 1) {
		// 			seleStaAend.value = 1;
		// 		}
		// 	}
		// };
		// const dealman3 = (e) => {
		// 	const show1 = uni.getStorageSync('满房日期显示');
		// 	if (show1 == 1) {
		// 		let man00 = 0;
		// 		let man01 = 0;
		// 		const array = yimanArray.value;
		// 		const array1 = e;
		// 		for (let i = 0; i < array.length; i++) {
		// 			const name1 = array[i];
		// 			for (let i = 0; i < array1.length; i++) {
		// 				const name2 = array1[i];
		// 				if (name2 == name1) {
		// 					if (name2 == endTimeString.value) {
		// 						return 0;
		// 					}
		// 					return 1;
		// 				}
		// 			}
		// 		}
		// 	}
		// };
		const dealshow = () => {
			startday0.value = dealDate1(startTimeString.value);
			endday0.value = dealDate1(endTimeString.value);
			dayNum1.value = ((endTimeString.value - startTimeString.value) / 1000 / 3600 / 24);
			const date1 = new Date(dealDate(startTimeString.value));
			const date2 = new Date(dealDate(endTimeString.value));
			const index1 = date1.getDay();
			const index2 = date2.getDay();
			startweek0.value = weekList1[index1];
			endweek0.value = weekList1[index2];
		};
		const dealshow1 = (year, month, timeString, dayarray, index1, index2) => {
			let man02 = 0;
			for (let i = 0; i < dayarray.length; i++) {
				const day01 = dayarray[i];
				const time1 = `${year}/${month}/${day01.num}`;
				const timeString1 = new Date(time1).getTime();
				let man01 = day01.status; //已满
				if (timeString1 > startTimeString.value && timeString1 < endTimeString.value) { //大于开始时间时间戳并小于结束时间时间戳的范围
					if (man01 == 1) {
						man02 = 1;
					}
				}
				if (timeString1 == startTimeString.value) {
					if (man01 == 1) {
						man02 = 1;
					}
				}
			}
			if (man02 == 1) {
				timeArr.value = [];
				const dic = {
					time: timeString,
					index1: index1,
					index2: index2,
				};
				timeArr.value.push(dic);
				timeArr.value.push(dic);
				startTimeString.value = timeString;
				endTimeString.value = timeString;
				startindex1.value = index1;
				startindex2.value = index2;
				endindex1.value = index1;
				endindex2.value = index2;
			}
		};

		watch([startTimeString, endTimeString], () => {
			dealshow();
		});
</script>


<style lang="less" scoped>
	
	/deep/.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	// 整个容器
	
	.container {
		background-color: #fff;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		// 头部操作区域
		.navTop {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 160rpx;
			width: 100%;
			margin-bottom: 30rpx;

			// 取消按钮
			.cancel {
				font-size: 28rpx;
				z-index: 10;
			}

			// 标题
			.title {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				font-size: 32rpx;
				line-height: 80rpx;
				text-align: center;

			}
		}

		// 周容器  周日-周六
		.week {
			width: 100%;
			display: flex;
			align-items: center;
			// border-bottom: 1rpx solid #ededed;
			padding-bottom: 20rpx;
			margin-bottom: 30rpx;
			color:#666a6d;
			background-color: #f0f4f7;
		    padding: 0 32rpx;
			line-height: 70rpx;

			view {
				width: 14.2857%;
				text-align: center;
			}
		}

		// 年份以及月份
		.yearAndMonth {
			// text-align: center;
			margin-bottom: 30rpx;
		}

		// 日期视口容器
		.dateView {
			flex: 1;
			overflow: auto;
			width: calc(100% - 64rpx);
			.date {
				margin-bottom: 60rpx;
			}

			.dayList {
				display: flex;
				flex-wrap: wrap;

				.day {
					position: relative;
					width: 14.2857%;
					text-align: center;
					color: #666;
					padding: 35rpx 0;
					border-radius: 8rpx;
				}

				.startDate{
					color: #fff;
					// background: linear-gradient(90deg, #50668D 0%, #50668D 100%);
					background-color: #6dbc9d;
				}
				.endDate{
					color: #fff;
					// background: linear-gradient(90deg, #50668D 0%, #50668D 100%);
					background-color: #6dbc9d;
				}
				

				.star,.end{
					position: absolute;
					top:70rpx;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-size: 20rpx;
				}
				
				
				.same{
					bottom:-63%;
				}

				// 今天
				.today {
					position: absolute;
					top:10rpx;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					height: fit-content;
					color: #fff;
					font-size: 20rpx;
					view{
						line-height: 24rpx;
						// border-bottom: 2rpx solid #F10E31;
					}
				}

				// 今天以前 过期 已满
				.overdue {
					color: #cecece;
					.yiman{
						position: absolute;
						top:70rpx;
						left: 0;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						// color: #fff;
						font-size: 20rpx;
					}
				}
				
				// 选择范围
				.scope {
					background-color: #edf2fa;
					// border-radius: 20rpx;
				}
			}

		}

		// scrollbar隐藏
		.dateView::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
			background-color: transparent;
			display: none;
		}

	}
	// 底部按钮区域
	.btnGroup {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		z-index: 1;
		border-top: 1rpx #ededed solid;
		
		view {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			font-size: 32rpx;
			box-sizing: border-box;
			border-radius: 50rpx;
			width: 328rpx;
		}

		:first-child {
			color: #333;
			border: #ededed 1rpx solid;
		}

		:last-child {
			color: #fff;
			// background: linear-gradient(90deg, #FF5F32 0%, #F10E31 100%);
			background-color: #50668D;

		}
	}
	
	.navTopstar{
		display: flex;
	}
	.navTopstar1{
		// width: 33%;
		margin-left: 33rpx;
		
	}
	.name{
	
		font-size: 30rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		margin-bottom:10rpx ;
		
		color: #333333;
	}
	.name1{
		font-size: 24rpx;
		color: #999999;
		
		
	}
	.name2{
		font-size: 24rpx;
		color: #333333;
		margin-top: 15rpx;
		margin-left: 5rpx;
	}
	.navTopxianview{
			width: 160rpx;
			margin-left: 33rpx;
			
			
	}
	.navTopxianname{
		
		width: 100%;
		height: 34rpx;
		
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: CENTER;
		color: #ffa100;
		margin-bottom: 9rpx;
		
	}
	.navTopxian{
		
		width: 160rpx;
		height: 1rpx;
		background-color: #ffa100;
		// border: 1rpx solid #ffa100;
		
	}
</style>