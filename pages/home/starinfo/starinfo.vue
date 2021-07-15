<template>
	<view>
		<view class="userinfo padding">
			<image
				class="headimg"
				mode="aspectFill"
				:src="star.head_img || '/static/index/default.png'"
			></image>
			<view class="basic-info">
				<view class="name">{{ star.stage_name }}</view>
				<view class="user-tag flex">
					<view>{{ star.city || '' }}</view>
					<view>人气值:{{ star.fans_count + star.virtual_fans || 0 }}</view>
				</view>
				<view class="time text-sm">注册时间:{{ star.audit_time || '' }}</view>
			</view>
			<view class="action">
				<view class="top-btn" @click="orderstar(star.uid)">预约服务</view>
				<view class="care-btn" @click="followstar(star.uid, star.follow && star.follow.id)">
					{{ star.follow && star.follow.id ? '已关注' : '关注TA' }}
				</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view
					class="cu-item flex-sub"
					:class="index === TabCur ? 'text-green cur' : ''"
					v-for="(item, index) in ['资料', '作品']"
					:key="index"
					@click="bindselect(index)"
				>
					{{ item }}
				</view>
			</view>
		</scroll-view>
		<view class="basic-item bg-white" v-if="TabCur === 0">
			<view class="tag-title">基础资料</view>
			<view class="content">
				<view class="item">
					<text class="text-gray">年龄</text>
					<text class="margin-left-sm text-black">{{ star.age }}岁</text>
				</view>
				<view class="item ">
					<text class="text-gray">星座</text>
					<text class="margin-left-sm text-black">{{ star.constellation }}</text>
				</view>
				<view class="item ">
					<text class="text-gray">职业</text>
					<text class="margin-left-sm text-black">{{ star.job }}</text>
				</view>
			</view>
			<view class="content-bot">
				<view class="item">
					<text class="text-gray">地区</text>
					<text class="margin-left-sm text-black">
						{{ star.province }}{{ star.city }}{{ star.district }}
					</text>
				</view>
			</view>
			<view class="tag-titles">个人信息</view>
			<view class="contents">
				<view class="item">
					<text class="text-gray">身高</text>
					<text class="margin-left-sm text-black">{{ star.height }}cm</text>
				</view>
				<view class="item ">
					<text class="text-gray">体重</text>
					<text class="margin-left-sm text-black">{{ star.weight }}kg</text>
				</view>
				<view class="item ">
					<text class="text-gray">鞋码</text>
					<text class="margin-left-sm text-black">{{ star.shoe_size }}</text>
				</view>
			</view>
			<view class="contents-bot">
				<view class="item">
					<text class="text-gray">胸围</text>
					<text class="margin-left-sm text-black">{{ star.bust }}</text>
				</view>
				<view class="item ">
					<text class="text-gray">腰围</text>
					<text class="margin-left-sm text-black">{{ star.waistline }}</text>
				</view>
				<view class="item ">
					<text class="text-gray">臀围</text>
					<text class="margin-left-sm text-black">{{ star.hipline }}</text>
				</view>
			</view>
			<view class="tag-titles-s">模卡</view>
			<view class="contents" style="margin-top:500rpx;">
				<image
					@click.stop="preview(star.moka)"
					class="moka-image margin-top-sm"
					lazy-load="true"
					:src="star.moka"
					mode="aspectFill"
				></image>
			</view>
			<view class="user-tags-list">
				<view class="cu-tag radius line-green" :key="it" v-for="it in star.artist_type">
					{{ it }}
				</view>
			</view>
		</view>
		<view class="user-work" v-else>
			<work-list :worklist="worklist"></work-list>
			<null-tip v-if="!worklist.length"></null-tip>
		</view>
	</view>
</template>

<script>
import WorkList from '@/components/Worklist';
import NullTip from '@/components/Nulltip';
import { starinfo, workslist, starorder, starfollow, notfollow } from '@/request/api.js';
export default {
	data() {
		return {
			TabCur: 0,
			star: {},
			worklist: [],
			where: {
				page: 1,
				limit: 10
			},
			uid: ''
		};
	},
	components: { WorkList, NullTip },
	onLoad(options) {
		if (options.hasOwnProperty('cur')) {
			var params = { uid: options.id };
		} else var params = { id: options.id, view_uid: options.uid };
		this.uid = options.uid;
		starinfo(params)
			.then(res => {
				res.artist_type && (res.artist_type = res.artist_type.split(','));
				this.star = res;
				params.uid && this.bindselect(1);
			})
			.catch(Error => {
				uni.navigateBack();
			});
	},
	onShareAppMessage: function() {
		return {
			title: '艺人:'+this.star.stage_name+'的详情',
			imageUrl: this.star.moka,
			path: `/pages/home/starinfo/starinfo?id=${this.star.id}&uid=${this.uid}`
		};
	},
	onShareTimeline: function() {
		return {
			title: '萌新通告',
			query: {
				id: this.star.id,
				uid:this.uid
			}
		};
	},
	onReachBottom() {
		if (this.TabCur === 1) this.dorequest();
	},
	methods: {
		preview(url) {
			uni.previewImage({
				urls: [url],
				current: 0
			});
		},
		async bindselect(e) {
			this.TabCur = e;
			if (e === 1) {
				this.where.page = 1;
				this.worklist = [];
				this.dorequest();
			}
		},
		async dorequest() {
			let { id, uid } = this.star;
			let { list, count } = await workslist({ ...this.where, ...{ id, uid } });
			if (count < 10 && this.where.page > 1) {
				this.$util.$toast('没有更多作品了~');
			}
			this.where.page += 1;
			this.worklist = [...this.worklist, ...list];
		},
		async orderstar(artist_uid) {
			uni.showModal({
				title: '预约服务',
				content: '提交预约后我们将尽快与您联系',
				confirmColor: '#34b630',
				success: async function(res) {
					if (res.confirm) {
						await starorder({ artist_uid });
						uni.showToast({
							title: '预约成功',
							icon: 'none'
						});
					}
				}
			});
		},
		async followstar(artist_uid, id = 0) {
			if (this.star.follow && this.star.follow.id) {
				await notfollow({ id });
				this.star.follow = {};
				uni.$emit('bindfollow', 1); //取消关注
			} else {
				this.star.follow = await starfollow({ artist_uid });
				uni.$emit('bindfollow', 2); //新增关注
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'info.scss';
</style>
