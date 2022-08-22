<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: 'https://mp.weixin.qq.com/s/UpMFXqYURWxxeiKXb-hnhw'
		};
	},
	onLoad(param) {
		if(param.source==='index'){
			uni.setNavigationBarTitle({
				title:'萌新MODEL社'
			})
		}
		this.url = param.url;
	}
};
</script>