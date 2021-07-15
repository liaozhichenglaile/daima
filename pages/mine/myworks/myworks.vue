<template>
	<view>
		<work-list :worklist="works"></work-list>
		<block v-if="!works.length"><null-tip></null-tip></block>
	</view>
</template>
<script>
import NullTip from '@/components/Nulltip';
import WorkList from '@/components/Worklist';
import { workslist } from '@/request/api.js';
export default {
	name: 'Myworks',
	data() {
		return {
			works: [],
			where: {
				page: 1,
				limit: 10,
				is_me: 1
			},
			stopload:false
		};
	},
	components: {
		WorkList,
		NullTip
	},
	onLoad() {
		this.getworks();
	},
	onReachBottom() {
		this.getworks()
	},
	methods: {
		async getworks() {
			if(this.stopload)return
			let { list,count } = await workslist(this.where);
			if(count<10&&this.where.page>1){
				this.$util.$toast('没有更多作品了')
				this.stopload=true
			}
			this.where.page+=1
			this.works = [...this.works,...list];
		}
	}
};
</script>
