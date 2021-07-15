<template>
	<view>
		<view class="fixed-main" v-if="!loading">
			<home-page :page.sync="CurrPage" v-show="CurrPage === 1"></home-page>
			<star-page v-if="CurrPage === 2"></star-page>
			<join-page :userdetail="user" v-show="CurrPage === 3" :joinshow="joinshow"></join-page>
			<reserve-page :userdetail="user" v-show="CurrPage === 4"></reserve-page>
			<mine-page :userdetail="user" v-show="CurrPage === 5"></mine-page>
		</view>
		<view class="fixed-bottom">
			<view class="cu-bar tabbar bg-white">
				<view class="action text-green" @click="changepage(1)">
					<image
						class="icon-default"
						:src="basic + (CurrPage === 1 ? 'shouyel' : 'shouye') + '.png'"
					></image>
					<view
						class="margin-top-xs"
						:class="CurrPage === 1 ? 'text-green' : 'text-gray'"
					>
						首页
					</view>
				</view>
				<view class="action text-gray" @click="changepage(2)">
					<image
						class="icon-default"
						:src="basic + (CurrPage === 2 ? 'yirenl' : 'yiren') + '.png'"
					></image>
					<view
						class="margin-top-xs"
						:class="CurrPage === 2 ? 'text-green' : 'text-gray'"
					>
						艺人
					</view>
				</view>
				<view class="action text-gray" @click="changepage(3)">
					<image class="add-icon" src="/static/bottom/icon_home_tab_joinl.png"></image>
					<view
						class="margin-top-xs"
						:class="CurrPage === 3 ? 'text-green' : 'text-gray'"
					>
						加入
					</view>
				</view>
				<view class="action text-gray" @click="changepage(4)">
					<image
						class="icon-default"
						:src="basic + (CurrPage === 4 ? 'yuyuel' : 'yuyue') + '.png'"
					></image>
					<view
						class="margin-top-xs"
						:class="CurrPage === 4 ? 'text-green' : 'text-gray'"
					>
						预约
					</view>
				</view>
				<view class="action text-gray" @click="changepage(5)">
					<image
						class="icon-default"
						:src="basic + (CurrPage === 5 ? 'wodel' : 'wode') + '.png'"
					></image>
					<view
						class="margin-top-xs"
						:class="CurrPage === 5 ? 'text-green' : 'text-gray'"
					>
						我的
					</view>
				</view>
			</view>
		</view>
		<loading v-if="loading"></loading>
	</view>
</template>

<script>
import { sessionkey } from '@/request/api.js';
import loading from '@/components/loading';
export default {
	data() {
		return {
			CurrPage: 1,
			basic: '/static/bottom/icon_home_tab_',
			joinshow: false,
			user: {},
			loading: true
		};
	},
	components: {
		loading
	},
	onLoad() {
		let _this = this;

		uni.login({
			success(res) {
				sessionkey({ code: res.code }).then(response => {
					let { token, token_type } = response;
					uni.setStorageSync('star_token', token_type + token);
					setTimeout(() => {
						_this.loading = false;
					}, 800);
				});
			}
		});

		uni.$once('finish', res => {
			this.joinshow = true;
		});
	},
	onShareAppMessage: function() {
		return {
			title: '萌新通告'
		};
	},
	onShareTimeline: function() {
		return {
			title: '萌新通告'
		};
	},

	methods: {
		changepage(e) {
			if (this.loading) return;
			this.CurrPage = e;
		}
	}
};
</script>
<style lang="scss">
.fixed-main {
	width: 100%;
	margin-bottom: calc(128rpx + env(safe-area-inset-bottom) / 2);
}
.fixed-bottom {
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 999;
	.action {
		display: flex;
		flex-direction: column;
		.icon-default {
			height: 45rpx;
			width: 45rpx;
		}
		.add-icon {
			margin-top: -35rpx;
			height: 80rpx;
			width: 80rpx;
		}
	}
}
</style>
