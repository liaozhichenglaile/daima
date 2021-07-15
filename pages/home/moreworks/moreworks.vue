<template>
	<view class="work-list"><works :worklist="workslist"></works></view>
</template>

<script>
import Works from '@/components/Works';
import { workslist } from '@/request/api.js';
export default {
	name: 'Moreworks',
	data() {
		return {
			where: {
				page: 1,
				limit: 10
			},
			stopload: false,
			workslist: []
		};
	},
	onLoad() {
		this.getlist();
	},
	components: { Works },
	methods: {
		async getlist() {
			if (this.stopload) return;
			let { count, list } = await workslist(this.where);
			if (count < 10 && this.where.page > 1) {
				this.$util.$toast('没有更多作品了');
				this.stopload = true;
			}
			this.where.page += 1;
			this.workslist = [...this.workslist, ...list];
		}
	},
	onReachBottom() {
		this.getlist();
	}
};
</script>
<style lang="scss" scoped>
.work-list {
	width: 96%;
	margin: 30rpx auto;
}
/deep/ image:not(:nth-child(3n)) {
	margin-right: 1% !important;
}
/deep/ image:only-child {
	width: 98% !important;
	height: 300rpx;
	margin: auto;
}
/deep/image:nth-child(1) {
	margin-left: 1%;
}
</style>
