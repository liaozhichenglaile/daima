<template>
	<view>
		<view class="work" v-for="(item, index) in worklist" :key="index">
			<view class="title">
				<image src="/static/index/icon_xq_shj.png" mode="aspectFill"></image>
				<text class="text-grey margin-left-sm">{{ item.add_time }}</text>
			</view>
			<view class="main">
				<view class="header-title">{{ item.content }}</view>
				<view class="image">
					<image
						mode="aspectFill"
						:src="src"
						v-for="(src, key) in item.img"
						:key="key"
						@click="$util.$previewImage(item.img, key)"
					></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'WorkList',
	data() {
		return {};
	},
	props: {
		worklist: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style lang="scss" scoped>
.work {
	width: 95%;
	margin: auto;
	.title {
		height: 80rpx;
		@include center-h;
		text-align: left;
		image {
			height: 35rpx;
			width: 35rpx;
		}
	}
	.main {
		width: 100%;
		background-color: #ffffff;
		border-radius: 12rpx;
		padding: 15rpx 15rpx 30rpx 15rpx;
		.header-title {
			color: #000;
			font-size: 32rpx;
			padding: 15rpx 15rpx 20rpx 15rpx;
		}
		.image {
			display: flex;
			flex-wrap: wrap;
			image {
				height: 200rpx;
				width: 32%;
			}
			image:nth-child(n + 4) {
				margin-top: 15rpx;
			}
			image:not(:nth-child(3n)){
			    margin-right: 2%; 
			}
			image:only-child {
					width: 100%;
					height: 300rpx;
					margin: auto;
			}
		}
	}
}
</style>
