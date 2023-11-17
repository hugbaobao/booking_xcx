const baseURL = 'https://xcx.ryxq.com.cn'

const https = function(url, data) {
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: baseURL + url,
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


// 登录 返回openid和sessionkey
export const getRoom = function(code) {
	return https('/login', {code})
}

// 解析手机号码
export const getPhoneApi = function(data) {
	return https('/WXBizDataCrypt', data)
}