<template>
<view>{{item}}</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({
					value: 1
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.star:nth-child(n + 2) {
		margin: 30rpx auto auto;
	}
	.star {
		width: 94%;
		margin: 100rpx auto auto;
		padding: 10rpx 20rpx;
		.left {
			width: 47%;
			image {
				height: 300rpx;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			.name {
				font-weight: 1000;
				font-size: 34rpx;
				color: #000;
			}
			.user-tag {
				margin-top: 8rpx;
				margin-bottom: 8rpx;
				white-space: nowrap;
				view {
					padding: 0 10rpx;
					position: relative;
				}
				view:nth-child(1) {
					padding: 0 10rpx 0 0;
				}
				view:nth-child(n + 2)::before {
					content: '';
					height: 25rpx;
					width: 3rpx;
					top: 4px;
					left: 0;
					background-color: #cccccc;
					position: absolute;
				}
			}
			.tag-list {
				height: 50rpx;
				// background-color: #e1f5e1;
				border-radius: 12rpx;
				// color: #34b630;
				text-align: center;
				line-height: 50rpx;
				font-size: 26rpx;
				margin: 20rpx auto 10rpx;
			}
			.btn {
				@include center(space-between) .order {
					width: 45%;
					height: 55rpx;
					text-align: center;
					line-height: 55rpx;
					background-color: #34b630;
					border-radius: 10rpx;
					color: #ffffff;
				}
				.follow {
					@extend .order;
					background-color: #e1f5e1;
					border: solid 2rpx #34b630;
					color: #34b630;
				}
				.follow-on {
					@extend .order;
					background-color: #ffffff;
					border: solid 2rpx #cccccc;
					color: #000000;
				}
			}
		}
	}
</style>
