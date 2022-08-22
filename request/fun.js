

const fun = (url, param = {}, method) => {
	//let baseUrl = "https://mx.aihuobao.cn/client_api"
	let baseUrl = "https://xcx.mengxintonggao.cn/client_api"
//	let baseUrl = "https://mt.aihuobao.cn/client_api"

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data: param,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': uni.getStorageSync('star_token')
			},
			method,
			success: (res) => {
				if (res.data.code === 0) {
					resolve(res.data.data)
				} else if (res.data.code === 1001) {
					uni.removeStorageSync('star_token');
				} else {
					reject(res.data)
					if (url !== '/artist/detail') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
				reject(err)
			},
		})
	})
}
export default fun
