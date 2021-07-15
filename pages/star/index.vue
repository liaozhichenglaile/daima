<template>
	<view>
		<custom-nav bgColor="bg-green" :search="true">
			<template #search>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input
						placeholder="请输入艺人名称"
						@confirm="bindsearch"
						confirm-type="search"
					/>
				</view>
			</template>
		</custom-nav>
		<filter-drop
			@confirm="confirm"
			:menuTop="CustomBar"
			:defaultSelected="defaultSelected"
			:filterData="filterData"
		></filter-drop>
		<scroll-view scroll-y style="height:100vh;" class="star-list" @scrolltolower="bindbottom">
			<block v-for="(item1, index1) in starlist" :key="index1">
				<view
					class="star flex bg-white radius"
					v-for="(item, index) in item1"
					:key="index"
					@click="startinfo(item.id)"
				>
					<view class="left">
						<image :src="item.cover_img" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="name">{{ item.stage_name }}</view>
						<view class="user-tag flex">
							<view>{{ item.city }}</view>
							<view>模特</view>
							<view>人气值:{{ item.fans_count + item.virtual_fans }}</view>
						</view>
						<view class="time text-gray margin-top-sm margin-bottom-sm text-sm">
							注册时间:{{ item.add_time }}
						</view>
						<view class="tag-list"></view>
						<view class="flex btn">
							<view class="order" @click.stop="orderserver(item.uid)">预约服务</view>
							<view
								:class="item.follow.id ? 'follow-on' : 'follow'"
								@click.stop="followstar(item.uid, index, item.follow.id || 0)"
							>
								{{ item.follow.id ? '已关注' : '关注TA' }}
							</view>
						</view>
					</view>
				</view>
			</block>
			<null-tip v-if="!starlist.length"></null-tip>
		</scroll-view>
	</view>
</template>

<script>
import FilterDrop from '@/components/filterDropdown';
import NullTip from '@/components/Nulltip';
import area from '@/utils/place_area.js';
import { starlist, starorder, starfollow, notfollow, types, userinfo } from '@/request/api.js';
export default {
	name: 'Star',
	data() {
		return {
			search: '',
			CustomBar: this.CustomBar + this.StatusBar + 20,
			starlist: [],
			where: {
				page: 1,
				limit: 10
			},
			stopload: false,
			defaultSelected: [[[0]]],
			filterData: [
				{
					name: '综合排序',
					type: 'hierarchy',
					submenu: [
						{
							name: '加入时间正序',
							value: 'asc'
						},
						{
							name: '加入时间倒序',
							value: 'desc'
						},
						{
							name: '人气值高到低',
							value: 'fans'
						},
						{
							name: '作品数高到低',
							value: 'works'
						}
					]
				},
				{
					name: '艺人类型',
					type: 'hierarchy',
					submenu: []
				},
				{
					name: '更多',
					type: 'hierarchy',
					submenu: [
						{
							name: '性别',
							value: 'sex',
							submenu: [
								{
									name: '全部',
									value: ''
								},
								{
									name: '女',
									value: '0'
								},
								{
									name: '男',
									value: '1'
								}
							]
						},
						{
							name: '地区',
							value: 'area',
							submenu: area
						},
						{
							name: '身高',
							value: 'height',
							submenu: [
								{
									name: '不限身高',
									value: ''
								},
								{
									name: '150cm以下',
									value: '0,150'
								},
								{
									name: '151-155',
									value: '151,155'
								},
								{
									name: '156-160',
									value: '156,160'
								},
								{
									name: '161-165',
									value: '161,165'
								},
								{
									name: '166-170',
									value: '166,170'
								},
								{
									name: '171cm以上',
									value: '171,200'
								},
							]
						},
					]
				}
			]
		};
	},
	components: {
		FilterDrop,
		NullTip
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
	mounted() {
		this.where.page = 1;
		this.stopload = false;
		this.getstarlist();
		// 艺人类型
		types({ type_code: 'ARTIST_TYPE' }).then(res => {
			let submenu = res.list.map(it => {
				return { name: it.name, value: it.name };
			});
			this.filterData[1].submenu = [{ name: '全部类型', value: '全部类型' }].concat(submenu);
		});
		uni.pageScrollTo({
			scrollTop: 0
		});
	},
	methods: {
		/**
		 * 艺人列表
		 */
		async getstarlist() {
			if (this.stopload) return;
			let { count, list } = await starlist(this.where);
			if (count < 10 && this.where.page > 1) {
				this.$util.$toast('没有更多艺人了');
				this.stopload = true;
			}
			this.starlist[this.where.page - 1] = list;
			this.where.page += 1;
		},
		async startinfo(id) {
			let res = await userinfo();
			uni.navigateTo({
				url: `../home/starinfo/starinfo?id=${id}&uid=${res.id}`
			});
		},
		async orderserver(artist_uid) {
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
		async followstar(artist_uid, index, id = 0) {
			if (this.starlist[index].follow && this.starlist[index].follow.id) {
				await notfollow({ id });
				this.starlist[index].follow = {};
				uni.$emit('bindfollow', 1); //取消关注
			} else {
				this.starlist[index].follow = await starfollow({ artist_uid });
				uni.$emit('bindfollow', 2); //取消关注
			}
		},
		bindsearch(e) {
			this.starlist = [];
			this.where.page = 1;
			this.where.name = e.detail.value;
			this.stopload = false;
			this.getstarlist();
		},
		confirm(e) {
			this.starlist = [];
			this.where.page = 1;
			this.stopload = false;
			let val = e.value;
			if (val[0][0] && ['asc', 'desc'].includes(val[0][0])) {
				this.where.audit_time_sort = val[0][0];
			} else if (val[0][0] && val[0][0] === 'fans') {
				this.where.fans_num_sort = 'desc';
			} else if (val[0][0] && val[0][0] === 'works') {
				this.where.dynamic_num_sort = 'desc';
			}
			if (val[1][0]) {
				if (val[1][0] === '全部类型') this.where.artist_type = '';
				else this.where.artist_type = val[1][0];
			}
			if (val[2][0]) {
				if (val[2][0] === 'sex') {
					this.where.sex = val[2][1];
					delete this.where['province'];
					delete this.where['city'];
					delete this.where['height'];
				} else if (val[2][0] === 'area') {
					this.where.province = val[2][1];
					this.where.city = val[2][2];
					delete this.where['sex'];
					delete this.where['height'];
				}else if (val[2][0] === 'height') {
					this.where.height = val[2][1];
					delete this.where['sex'];
					delete this.where['province'];
					delete this.where['city'];
				}
			}
			this.getstarlist();
		},
		bindbottom(e) {
			this.getstarlist();
		}
	}
};
</script>

<style scoped lang="scss">
@import 'index.scss';
</style>
