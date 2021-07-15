<template>
	<view>
		<image class="top-bg" src="https://mx.aihuobao.cn/mini/join_banner.png"></image>
		<view class="content bg-white radius padding-xs">
			<view class="tag-item">基础信息</view>
			<view class="tag-item-right" v-if="auditstate !== 1 && !isfirst" @click="showtoast">
				{{ auditstate | auditext }}
				<text class="cuIcon-question margin-left-xs"></text>
			</view>
			<scroll-view scroll-y style="height:999rpx">
				<form @submit="submit">
					<view class="cu-form-group" style="padding-top: 115rpx;">
						<view class="title">艺名</view>
						<input placeholder="请输入艺名" v-model="stage_name" name="stage_name" />
					</view>
					<view class="cu-form-group">
						<view class="title">身高</view>
						<input
							placeholder="请输入身高"
							type="digit"
							v-model="height"
							name="height"
						/>
						<view class="text-black text-lg">Cm</view>
					</view>
					<view class="cu-form-group">
						<view class="title">体重</view>
						<input
							placeholder="请输入体重"
							type="digit"
							v-model="weight"
							name="weight"
						/>
						<view class="text-black text-lg">Kg</view>
					</view>
					<view class="cu-form-group">
						<view class="title">三围</view>
						<input
							placeholder="胸围"
							class="text-center"
							v-model="bust"
							type="digit"
							name="bust"
						/>
						<input
							placeholder="腰围"
							class="text-center"
							v-model="waistline"
							type="digit"
							name="waistline"
						/>
						<input
							placeholder="臀围"
							class="text-center"
							v-model="hipline"
							type="digit"
							name="hipline"
						/>
						<view class="text-black text-lg">Cm</view>
					</view>
					<view class="cu-form-group">
						<view class="title">鞋码</view>
						<input placeholder="请输入鞋码" v-model="shoe_size" name="shoe_size" />
						<view class="text-black text-lg">码</view>
					</view>
					<view class="cu-form-group">
						<view class="title">所在城市</view>
						<picker mode="region" name="area" @change="placeChange">
							<view class="picker" :class="place[0].length ? 'text-black' : ''">
								{{
									place[0]
										? place[0] + '-' + place[1] + '-' + place[2]
										: '点击所在城市'
								}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">毕业(在读)院校</view>
						<input
							class="text-right"
							placeholder="请输入毕业(在读)院校"
							v-model="college"
							name="college"
						/>
					</view>
					<view class="cu-form-group">
						<view class="title">当前职业</view>
						<input
							placeholder="请输入当前职业"
							class="text-right"
							v-model="job"
							name="job"
						/>
					</view>
					<view class="cu-form-group" style="position: relative;padding: 1rpx 5rpx;">
						<textarea
							maxlength="200"
							name="speciality"
							v-model="speciality"
							:show-confirm-bar="false"
							placeholder="请输入艺术特长"
						/>
						<view class="note-count">{{ speciality.length }}/200</view>
					</view>
					<view class="cu-form-group">
						<view class="title" style="width: 150rpx;">艺人类型</view>
						<view class="tag-list flex flex-wrap">
							<view
								:class="item.check ? 'c-item' : 'item'"
								v-for="(item, index) in startag"
								:key="index"
								@click="selectitem(index)"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">微信号</view>
						<input
							class="text-right"
							placeholder="请输入微信号"
							v-model="wechat_id"
							name="wechat_id"
						/>
					</view>
					<view class="flex padding flex-direction">
						<button class="cu-btn lg" form-type="submit">下一步</button>
					</view>
				</form>
			</scroll-view>
		</view>
		<auth :model.sync="showauth" :isuser="isuser"></auth>
	</view>
</template>

<script>
import Auth from '@/components/Auth';
import { userinfo, starsub, types, starinfo } from '@/request/api.js';
const objkey = {
	stage_name: '艺名',
	height: '身高',
	weight: '体重',
	bust: '胸围',
	waistline: '腰围',
	hipline: '臀围',
	shoe_size: '鞋码',
	college: '毕业院校',
	artist_type: '艺人类型',
	job: '职业',
	speciality: '艺术特长',
	wechat_id: '微信号'
};
export default {
	name: 'Join',
	data() {
		return {
			place: [],
			showauth: false,
			objkey: objkey,
			isuser: false,
			startag: [],
			startype: [],
			stage_name: '',
			height: '',
			weight: '',
			bust: '',
			waistline: '',
			hipline: '',
			shoe_size: '',
			college: '',
			job: '',
			speciality: '',
			wechat_id: '',
			auditstate: 0,
			starmsg: '',
			isfirst: false,
			isure: false
		};
	},
	components: { Auth },
	props: {
		joinshow: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		joinshow(val) {
			if (val) {
				this.setmeans(1);
				this.$forceUpdate();
			}
		}
	},
	filters: {
		auditext: value => {
			return { 0: '待审核', 1: '审核通过', 2: '已驳回' }[value];
		}
	},
	mounted() {
		this.setuser();
		uni.$on('authuser', () => {
			this.setuser();
		});
	},
	methods: {
		setmeans(tip) {
			starinfo({ is_me: 1 })
				.then(res => {
					this.stage_name = res.stage_name;
					this.height = res.height;
					this.weight = res.weight;
					this.bust = res.bust;
					this.waistline = res.waistline;
					this.hipline = res.hipline;
					this.shoe_size = res.shoe_size;
					this.college = res.college;
					this.job = res.job;
					this.speciality = res.speciality;
					this.wechat_id = res.wechat_id;
					this.place = [res.province, res.city, res.district];
					this.auditstate = tip ? 0 : res.state;
					this.starmsg = res.remark;
					let tag_arr = res.artist_type.split(',');
					this.startag.forEach(it => {
						tag_arr.forEach(its => {
							if (it.name === its) it.check = true;
						});
					});
					this.startag = this.startag;
				})
				.catch(() => {
					this.isfirst = true;
				});
		},
		async setuser() {
			let res = await userinfo();
			if (!res.nickname && !res.head_img && !res.tel) {
				this.isuser = true;
				this.showauth = true;
				this.isure = true;
			} else if (!res.tel && res.nickname && res.head_img) {
				this.isure = true;
				this.isuser = false;
				this.showauth = true;
			} else if (res.nickname && res.head_img && res.tel) {
				this.showauth = false;
				this.isure = false;
			}
			this.getags(res.identity);
		},
		/**
		 * @param {Object}标签类型
		 */
		async getags(identity) {
			let { list } = await types({ type_code: 'ARTIST_TYPE' });
			this.startag = list.map(it => Object.assign({}, { name: it.name, check: false }));
			this.setmeans();
		},
		showtoast() {
			if (this.auditstate === 0) {
				this.$util.$toast('资料已经提交，我们将会尽快审核！');
			} else if (this.auditstate === 2) {
				uni.showModal({
					title: '资料驳回',
					content: '请重新提交！理由:' + this.starmsg,
					confirmColor: '#34b630',
					showCancel: false,
					confirmText: '好的',
					success: async function(res) {
						if (res.confirm) {
						} else {
						}
					}
				});
			}
		},
		selectitem(index) {
			this.startag[index].check = !this.startag[index].check;
		},
		placeChange(e) {
			this.place = e.detail.value;
		},
		submit(e) {
			if (this.isure) {
				return (this.showauth = true);
			}
			for (let key in e.detail.value) {
				if (e.detail.value[key] === '' || e.detail.value[key] === -1) {
					this.$util.$toast(`请检查${objkey[key]}`);
					return;
				}
			}
			if (!this.place.length) {
				return this.$util.$toast(`请检查所在城市`);
			}
			let tag = this.startag.filter(it => it.check);
			if (!tag.length) {
				return this.$util.$toast(`请选择标签`);
			}
			let copy = JSON.parse(JSON.stringify(e.detail.value));
			delete copy['area'];
			delete copy['artist_type'];
			let params = {
				...copy,
				province: e.detail.value.area[0] || this.place[0],
				city: e.detail.value.area[1] || this.place[1],
				district: e.detail.value.area[2] || this.place[2],
				artist_type: tag.map(it => it.name).join()
			};
			uni.navigateTo({
				url:
					'/pages/join/submit/submit?ident=' +
					this.auditstate +
					'&msg=' +
					encodeURIComponent(JSON.stringify(params))
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import 'index.scss';
.tag-list {
	flex: 1;
	.item {
		padding: 8rpx 15rpx;
		border: 1rpx solid #cccccc;
		color: #cccccc;
		margin-right: 10rpx;
		border-radius: 12rpx;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.c-item {
		@extend .item;
		border: 1rpx solid #34b630;
		color: #34b630;
	}
}
</style>
