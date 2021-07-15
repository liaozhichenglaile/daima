<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
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