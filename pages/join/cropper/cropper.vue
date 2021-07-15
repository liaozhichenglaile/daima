<template>
	<view>
		<cropper ref="cropper" :aspectRatio="1" @complete="complete" @cancel="cancel"></cropper>
	</view>
</template>

<script>
	// 图片裁剪
	import cropper from '@/components/cropper';
	export default {
		components: {cropper},
		onLoad(param) {
			this.$refs.cropper.init(param.url);
		},
		onUnload() {
			// uni.$off('bindfinish')
		},
		methods: {
			/**
			 * 裁剪
			 */
			complete(e){
				console.log(e);
				uni.$emit('bindfinish',e.path)
				uni.navigateBack()
			},
			/**
			 * 取消
			 */
			cancel(){
				uni.navigateBack()
			}
			
		}
	}
</script>

<style scoped>
 page{
	 background-color: #000000;
 }
</style>
