class NavData {
	constructor(){
		let menuButtonObject = uni.getMenuButtonBoundingClientRect();
		
		uni.getSystemInfo({
		    success: res => {
		      //导航高度
		        let statusBarHeight = res.statusBarHeight,
		            navTop = menuButtonObject.top,
			        navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width; // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
				  
				  
		        this.fullH = statusBarHeight + menuButtonObject.height + (navTop - statusBarHeight) * 2;   //导航栏总体高度
		        this.capsuleScrolltop = navTop;     //胶囊距离顶部距离
		        this.capsuleScrollbottom = navTop - statusBarHeight;     //胶囊距离底部距离
		        this.capsulesH = menuButtonObject.height   //胶囊高度
		        this.capsulesToRight = navObjWid    //胶囊宽度(包括右边距离)
		    },
		    fail(err) {
		      console.log('get navgationinfo err in hooks getNav', err);
		    }
		})
	}
}

const navdate = new NavData()
export default navdate