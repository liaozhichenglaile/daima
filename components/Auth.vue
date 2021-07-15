<template>
	<view>
		<view class="auth-model bg-white" v-if="model">
			<view class="content" v-if="isuser">
				<view class="cuIcon-close close" @click="$emit('update:model', false)"></view>
				<view class="margin-top-sm text-lg">为了后续更好的服务</view>
				<view class="text-lg margin-top-sm">需微信授权头像昵称</view>
			</view>
			<view class="content" v-else>
				<view class="cuIcon-close close" @click="$emit('update:model', false)"></view>
				<image src="/static/index/success.png"></image>
				<view class="margin-top-sm text-lg">微信授权成功</view>
				<view class="text-sm margin-top-sm">授权绑定你的手机号</view>
			</view>
			<view class="bottom">
				<view class="left" @click="$emit('update:model', false)">拒绝</view>
				<button
					class="cu-btn right text-red"
					@click="bindgetUserInfo"
					v-if="isuser"
				>
					允许
				</button>
				<button
					v-if="!isuser"
					class="cu-btn right text-red"
					open-type="getPhoneNumber"
					@getphonenumber="bindgetphonenumber"
				>
					允许
				</button>
			</view>
		</view>
		<view class="mask" @touchmove.stop.prevent="moveStop" :hidden="!model"></view>
	</view>
</template>

<script>
import { login } from '@/request/api.js';
import { getbasickey, bindtelkey } from '@/utils/get.js';
export default {
	name: 'Auth',
	props: {
		model: {
			type: Boolean,
			default: false
		},
		isuser: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		moveStop() {},
		async bindgetphonenumber(e) {
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				await bindtelkey(e.detail.encryptedData, e.detail.iv);
				this.$emit('update:model', false);
				uni.$emit('authuser', 10);
			}
		},
		async bindgetUserInfo() {
			const _t = this;
			wx.getUserProfile({
				desc: '获取你的昵称、头像、地区及性别',
				success:async ({ userInfo }) => {
					const param = {
						nickname: userInfo.nickName,
						head_img: userInfo.avatarUrl
					};
					await getbasickey(param);
					this.$emit('update:model', false);
					uni.$emit('authuser', true);
				},
				fail(err) {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #000;
	opacity: 0.5;
	z-index: 4;
}
.auth-model {
	height: 400rpx;
	width: 80%;
	margin: auto;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	border-radius: 20rpx;
	button {
		margin: 0px;
		padding: 0px;
		border: 0px;
		outline: none;
		background-color: #ffffff;
	}
	.content {
		height: 250rpx;
		width: 100%;
		margin-top: 50rpx;
		position: relative;
		@include center-s(center);
		image {
			height: 90rpx;
			width: 90rpx;
		}
		.close {
			position: absolute;
			right: 30rpx;
			top: -15px;
			font-size: 40rpx;
		}
	}
	.bottom {
		display: flex;
		height: 100rpx;
		border-top: 1rpx solid #cccccc;
		.left,
		.right {
			flex: 1;
			@include center;
		}
		.left {
			border-right: 1rpx solid #cccccc;
		}
		.cu-btn {
			height: auto;
		}
	}
}
</style>
