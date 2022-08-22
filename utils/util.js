//预览图
const $previewImage = (urls = [], current = 0) => {
	uni.previewImage({
		urls,
		current
	});
}
const $toast = (v) => {
	uni.showToast({
		title: v,
		icon: 'none'
	})
}
const $succ = (v, n = 1) => {
	uni.showToast({
		title: v,
		icon: 'none'
	})
	setTimeout(() => {
		uni.navigateBack({
			delta: n
		})
	}, 1000)
}
const $upload = async (arrs, url) => {
	uni.showLoading({
		title: '上传中',
		mask: true
	})
	return new Promise(async (resolve, reject) => {
		let prefixUrls = [];
		 for (let i = 0; i < arrs.length; i++) {
			if(arrs[i].indexOf('https://')>-1){
				prefixUrls.push(arrs[i]);
				if (prefixUrls.length === arrs.length) {
					uni.hideLoading()
					resolve(prefixUrls.join());
				}
			}else{
				let return_url=await $image(arrs[i])
			    prefixUrls.push(return_url);
				if (prefixUrls.length === arrs.length) {
					uni.hideLoading()
					resolve(prefixUrls.join());
				}
			}
		}
	});
}
const $image=(url)=>{
	return new Promise((resolve)=>{
		uni.uploadFile({
			url:'https://xcx.mengxintonggao.cn/client_api/assist/upload_img',
			filePath: url,
			header: {
				"content-type": "multipart/form-data",
			},
			name: "file",
			success: async (res) => {
				let curr = JSON.parse(res.data);
				console.log('这是curr',curr)
				resolve(curr.data.url)
			},
			fail: () => {
				uni.showToast({
					title: '图片上传错误,请重试',
					icon: 'none'
				})
			}
		});
	})
}
module.exports = {
	$toast,
	$succ,
	$previewImage,
	$upload
}