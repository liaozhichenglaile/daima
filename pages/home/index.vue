<template>
	<view>
		<scroll-view scroll-y class="page">
			<image class="top-bg" src="https://xcx.mengxintonggao.cn/mini/img_sy_gud_bg.png"></image>

			<swiper
				class="swiper-banner screen-swiper square-dot"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				indicator-active-color="#34b630"
			>
				<swiper-item
					v-for="(item, index) in swiperList"
					:key="index"
					@click="jumpurl(item.jump_url)"
				>
					<image :src="item.img" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view class="tag-list">
				<image
					src="/static/bottom/img_sy_wenzi01.png"
					mode="aspectFill"
					class="tag-image"
				></image>
			</view>
			<view class="rank-list">
				<view
					class="work-item bg-white radius"
					v-for="(item, index) in starlist"
					:key="index"
					@click="starinfo(item.id)"
				>
					<view class="top-name">
						<image class="left-head" :src="item.head_img" mode="aspectFill"></image>
						<view class="right-list">
							<view class="name">{{ item.stage_name }}</view>
							<view class="user-tag flex">
								<view>{{ item.city }}</view>
								<view>人气值:{{ item.fans_count + item.virtual_fans }}</view>
							</view>
						</view>
						<image v-if ="item.logo" class="icon-sm"    :src="'/static/index/'+item.logo+'.png'"></image>
						<text  v-if ="item.logo"  class="icon-sms" >NO.{{item.logo}}</text>	
					</view>

					<view class="bottom-picture">
						<image class="moka-image" :src="item.moka" mode="aspectFill"></image>
					</view>
				</view>

				<view class="more-list" @click="$emit('update:page', 2)">
					查看更多艺人
					<text class="cuIcon-right text-sm"></text>
				</view>
			</view>
			<!-- 			<view class="tag-list" style="margin-top: 10rpx;">
				<image
					src="/static/bottom/img_sy_wenzi02.png"
					mode="aspectFill"
					class="tag-image"
				></image>
			</view>

			<view class="work-list">
				<works :worklist="works"></works>
				<view class="more-list" @click="moreworks">
					查看更多作品
					<text class="cuIcon-right text-sm"></text>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
import Works from '@/components/Works';
import { workslist, banner, nominate, works, userinfo } from '@/request/api.js';
export default {
	name: 'HomePage',
	data() {
		return {
			swiperList: [],
			starlist: [],
			works: []
		};
	},
	props: {
		page: {
			type: Number,
			default: 1
		}
	},
	mounted() {
		banner().then(res => {
			this.swiperList = res.list;
		});
		nominate().then(res => {
			this.starlist = res.list;
		});
		workslist({ is_top: 1 }).then(res => {
			this.works = res.list;
		});
	},
	components: { Works },
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
		async starinfo(id) {
			let res = await userinfo();
			uni.navigateTo({
				url: `/pages/home/starinfo/starinfo?id=${id}&uid=${res.id}`
			});
		},
		jumpurl(url) {
			if (!url) return;
			if (url.indexOf('https://') >= 0) {
				uni.navigateTo({
					url: '../mine/about/about?source=index&url=' + url
				});
			} else {
				uni.navigateTo({
					url: 'starinfo/starinfo?id=' + url
				});
			}
		},
		moreworks() {
			uni.navigateTo({
				url: '/pages/home/moreworks/moreworks'
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'index.scss';
.icon-sm {
	height: 40rpx;
	width: 40rpx;
	position: relative;
	left:-23rpx;
	bottom:29rpx;

}

.icon-sms {
	height: 40rpx;
	width: 40rpx;
	position: relative;
	
	left:-14rpx;
	bottom:19rpx;
	color: #21DBFF;

}
</style>
