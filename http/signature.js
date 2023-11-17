const baseURL = 'https://sig.ryxq.com.cn'

const https = function(url, data) {
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: baseURL + url,
			method: 'POST',
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
export const getSignature = function(meth, data) {
	return https('/sig', {
		method: meth,
		data: data
	})
}
