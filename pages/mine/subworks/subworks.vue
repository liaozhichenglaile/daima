<template>
	<view>
		<textarea v-model="content" :show-confirm-bar="false" placeholder="请输入作品标题" />
		<view class="image-list">
			<view class="image-item" v-for="(item, index) in imgList" :key="index">
				<image class="cover" :src="item" />
				<view class="del-round" @click="delimage(index)">
					<view class="cuIcon-close text-white"></view>
				</view>
			</view>
			<view class="image-item" v-if="imgList.length < 9">
				<image class="cover" @click="chooseimage" src="/static/index/carme.png" />
			</view>
		</view>
		<view class="flex padding flex-direction">
			<view class="cu-btn lg round" @click="submit">发布</view>
		</view>
	</view>
</template>

<script>
import { worksub } from '@/request/api.js';
export default {
	data() {
		return {
			content: '',
			imgList: [],
			disabled: false
		};
	},
	methods: {
		chooseimage() {
			let count = 9 - this.imgList.length;
			uni.chooseImage({
				count,
				sizeType: ['original', 'compressed'],
				success: res => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					} else {
						this.imgList = res.tempFilePaths;
					}
				}
			});
		},
		delimage(e) {
			this.imgList.splice(e, 1);
			this.$forceUpdate();
		},
		async submit() {
			if (!this.content && !this.imgList.length) {
				return this.$util.$toast('请检查内容');
			}
			if (this.imgList.length) {
				var img = await this.$util.$upload(this.imgList);
			} else var img = '';
			if (this.disabled) return;
			this.disabled = true;
			await worksub({ content: this.content, img });
			this.disabled = false;
			this.$util.$succ('提交成功！请等待审核通过');
		}
	}
};
</script>
<style>
page {
	background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
textarea {
	border: 1rpx solid #f1f1f1;
	margin: 30rpx auto;
	width: 90%;
	border-radius: 12rpx;
	padding: 15rpx;
}
.image-list {
	margin: 30rpx auto;
	width: 90%;
	flex-wrap: wrap;
	display: flex;

	.image-item {
		width: 32.33%;
		height: 220rpx;
		position: relative;
		margin-right: 1%;
		.cover {
			height: 100%;
		}
		.del-round {
			position: absolute;
			@include center;
			right: 0;
			top: 0;
			border-bottom-left-radius: 50%;
			height: 40rpx;
			width: 40rpx;
			background-color: red;
		}
	}
	.image-item:nth-child(3n) {
		margin-right: -1%;
	}
	.image-item:nth-child(n + 4) {
		margin-top: 20rpx;
	}
}
.cu-btn {
	background-image: linear-gradient(0deg, #34b630 0%, #91d78e 100%);
	border-radius: 60px;
	color: #ffffff;
	width: 60%;
	margin: auto;
}
</style>
