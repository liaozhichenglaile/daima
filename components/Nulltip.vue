<template>
	<view>
		<view class="center flex flex-direction align-center">
			<image src="/static/index/null.png" mode="aspectFill"></image>
			<view class="explain">
				<view class="tips">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'NullTip',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
   .center {
   	text-align: center;
   	margin: 200rpx auto;
   	font-size: 32rpx;
   	image {
   		width: 280rpx;
   		height: 280rpx;
   		border-radius: 50%;
   		margin-bottom: 20rpx;
   	}
   	.tips {
   		font-size: 24rpx;
   		color: #999999;
   		margin-top: 20rpx;
   	}

   }
</style>
