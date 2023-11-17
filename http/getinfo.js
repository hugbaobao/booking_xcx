// const baseURL = 'https://php.ryxq.com.cn'
const baseURL = 'http://127.0.0.1:8000'

const https = function(url, data, type = 'GET') {
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: baseURL + url,
			method: type,
		    data: data,
			timeout:8000,
			dataType:'json',
		    success: (res)=>{
				resolve(res)
			},
			fail(err) {
				console.log(err)
			}
		});
	})
}


// 房间预定
export const getRoom = function() {
	return https('/room/get',{})
}
export const getRoomShow = function(keys) {
	return https('/shop/shops',{keys})
}


// 首页
export const getHomeApi = function() {
	return https('/home/btget',{})
}


// 商城
export const getPngApi = function() {
	return https('/png/get',{})
}
export const getByTypeApi = function(val) {
	return https('/shop/type',{type:val})
}
export const getByTimeApi = function(val) {
	return https('/shop/new',{})
}


// 更多商品页
export const getByTypageApi = function(val, page) {
	return https('/shop/typage',{
		type:val,
		page
	})
}
// 模糊查询
export const searchByNameApi = function(val) {
	return https('/shop/search',{
		name:val
	})
}
// 减少库存
export const shopRawApi = function(ids, sum) {
	return https('/shop/search',{
		id:ids,
		count: sum
	})
}


// 用户信息
// 新增
export const addUserApi = function(val) {
	return https('/user/add',val)
}
// 查询
export const getUserApi = function(val) {
	return https('/user/byid',{
		openid: val
	})
}
// 修改
export const updataUserApi = function(val) {
	return https('/user/update', val, 'POST')
}
// 保存身份证信息
export const saveIdcardApi = function(ids, val) {
	return https('/user/idcard', {
		openid: ids,
		data: val
	}, 'POST')
}
export const changeVipApi = function(ids) {
	return https('/user/vip', {
		openid: ids
	})
}


// 发布内容
export const arttripApi = function(val) {
	return https('/art/add', val, 'POST')
}
export const getArttripApi = function() {
	return https('/art/get')
}
export const getbyidApi = function(id) {
	return https('/art/id',{id})
}
export const addZanApi = function(id) {
	return https('/art/zan',{id})
}

// 评论
export const addPingApi = function(val) {
	return https('/ping/add', val, 'POST')
}

// 共创中心
export const addcenterApi = function(val) {
	return https('/center/add', val, 'POST')
}
export const getcenterApi = function() {
	return https('/center/get')
}
export const centerbyidApi = function(id) {
	return https('/center/id',{id})
}
export const addCenterZanApi = function(id) {
	return https('/center/zan',{id})
}
export const addPingcenApi = function(val) {
	return https('/pingc/add', val, 'POST')
}


// 订单管理
export const addCarApi = function(val) {
	return https('/car/add', val, 'POST')
}
// 获取列表
export const getCarApi = function(val) {
	return https('/car/get', {openid:val})
}
// 删除商品
export const delByidApi = function(val) {
	return https('/car/id', {id:val})
}
// 改变支付状态
export const paySuccessApi = function(val) {
	return https('/car/pay', val, 'POST')
}
// 批量待支付
export const changeArrApi = function(val) {
	return https('/car/topay', {
		ids: val
	}, 'POST')
}
export const payAllApi = function(val, outtrade) {
	return https('/car/all', {
		ids: val,
		outtrade
	}, 'POST')
}


// 酒店订单
export const addOrderApi = function(val) {
	return https('/order/add', val, 'POST')
}
// 获取酒店订单
export const getOrderApi = function(val) {
	return https('/order/byid', {openid:val})
}
// 修改入住状态
export const changeZhuApi = function(val) {
	return https('/order/ifzhu', {id:val})
}
export const addFeeApi = function(ids, val) {
	return https('/order/addfee', {
		openid: ids,
		price: val
	}, 'POST')
}


// 获取积分
export const getIntegralApi = function(val) {
	return https('/integral/get', {openid:val})
}


// 查询可领取优惠券
export const getCouponallApi = function(array) {
	return https('/coupon/all', {arr:array}, 'POST')
}
// 领取优惠券
export const addCouponApi = function(val) {
	return https('/receivel/add', val, 'POST')
}
// 查询已领取
export const getReceiveApi = function(val) {
	return https('/receivel/all', {openid:val})
}
// 核销优惠券
export const useCouponApi = function(val) {
	return https('/receivel/use', {id:val})
}