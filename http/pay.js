const baseURL = 'https://pay.ryxq.com.cn'

const https = function(url, data) {
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: baseURL + url,
		    data: data,
			// method: 'POST',
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


export const getPay = function(open, trade, total) {
	return https('/', {
		openid: open,
		out_trade_no: trade,
		total_fee: total
	})
}

