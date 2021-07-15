<template>
	<view>
		<view class="userinfo">
			<view class="user-avatar">
				<image :src="user.head_img ? user.head_img : '/static/index/default.png'"></image>
			</view>
			<view class="user-name margin-top-sm">
				{{ user.nickname ? user.nickname : '暂未登录' }}
			</view>
		</view>
		<view class="usermenu bg-white" :style="user.identity ? '' : 'height:180rpx'">
			<view class="flex content">
				<view
					class="cu-btn line-green lg round margin-top-xl"
					@click="subworks"
					v-if="user.identity"
				>
					<image class="icon-sm" src="/static/index/icon_wode_fabu.png"></image>
					<text class="margin-left-sm">发布作品</text>
				</view>
				<view class="menu flex margin-top-xl">
					<view class="nav">
						<view class="count">{{ user.follow_count || 0 }}</view>
						<view class="name">关注</view>
					</view>
					<view class="nav">
						<view class="count">{{ user.fans_count + user.virtual_fans || 0 }}</view>
						<view class="name">人气值</view>
					</view>
					<view class="nav">
						<view class="count">{{ user.collect_count || 0 }}</view>
						<view class="name">收藏</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nav-menu bg-white">
			<view
				class="item flex"
				v-for="(item, index) in menu"
				:key="index"
				@click="menuto(index)"
			>
				<image class="icon-sm" :src="'/static/index/' + item.u + '.png'"></image>
				<view class="name margin-left">{{ item.n }}</view>
				<view class="cuIcon-right right"></view>
			</view>
		</view>
		<auth :isuser="true" :model.sync="showauth"></auth>
		<concat :show.sync="show"></concat>
	</view>
</template>

<script>
import { userinfo } from '@/request/api.js';
import Auth from '@/components/Auth';
import Concat from '@/components/Concat';
export default {
	name: 'Mine',
	data() {
		return {
			menu: [
				{ u: 'works', n: '我的作品' },
				{ u: 'about', n: '关于我们' },
				{ u: 'concat', n: '联系我们' }
			],
			showauth: false,
			user: {},
			isure: false,
			show: false
		};
	},
	components: { Auth, Concat },
	mounted() {
		this.setuser();
		uni.$on('authuser', () => {
			this.setuser();
		});
		// 监听新增-取消关注
		uni.$on('bindfollow', res => {
			if (res === 1) {
				this.user.follow_count -= 1;
			} else if (res === 2) {
				this.user.follow_count += 1;
			}
		});
	},
	methods: {
		async setuser() {
			let res = await userinfo();
			if (!res.nickname || !res.head_img) {
				this.showauth = true;
				this.isure = true;
			} else if (res.nickname && res.head_img) {
				this.showauth = false;
				this.isure = false;
			}
			this.user = res;
		},
		subworks() {
			uni.navigateTo({
				url: '/pages/mine/subworks/subworks'
			});
		},
		menuto(index) {
			if (this.isure) {
				return (this.showauth = true);
			}
			switch (index) {
				case 0:
					if (!this.user.identity) {
						this.$util.$toast('请先加入成为艺人');
					} else {
						uni.navigateTo({
							url: '/pages/mine/myworks/myworks'
						});
					}
					break;
				case 1:
					uni.navigateTo({
						url: '/pages/mine/about/about?source=mine&url='
					});
					break;
				case 2:
					this.show = true;
					break;
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import 'index.scss';
</style>
