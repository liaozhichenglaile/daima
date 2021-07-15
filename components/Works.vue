<template>
	<view>
		<view
			class="work-item radius"
			@click="userdetail(item.uid, item.id)"
			v-for="(item, index) in worklist"
			:key="index"
		>
			<view class="title">{{ item.content }}</view>
			<view class="image-list">
				<image :src="item.img[0]" mode="aspectFill" v-if="item.img[0]"></image>
				<image :src="item.img[1]" mode="aspectFill" v-if="item.img[1]"></image>
				<image :src="item.img[2]" mode="aspectFill" v-if="item.img[2]"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Works',
	data() {
		return {};
	},
	props: {
		worklist: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		userdetail(uid, id) {
			uni.navigateTo({
				url: `/pages/home/starinfo/starinfo?cur=1&id=${uid}&uid=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.work-item:nth-child(n + 2) {
	margin-top: 15rpx;
}
.work-item {
	background-color: #ffffff;
	padding-bottom: 20rpx;
	.title {
		padding: 20rpx 20rpx 0;
		font-size: 34rpx;
		@include overtext(2);
	}
	.image-list {
		width: 96%;
		margin: 20rpx auto auto;
		flex-wrap: wrap;
		display: flex;
		image {
			width: 32%;
			height: 200rpx;
		}
		image:nth-child(n + 4) {
			margin-top: 10rpx;
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
	.cu-tag {
		font-weight: 1000;
	}
}
</style>
