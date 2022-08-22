<template>
	<view>
		<view class="cu-modal" :class="{ 'show': show }" @click.stop="$emit('update:show',false)">
			<view class="cu-dialog bg-white">
				<view class="padding">
					<view class="grid col-1">
						<view class="padding-sm item">
							<view>联系电话/微信:18458876560</view>
							<view class="cu-btn line-green sm radius margin-left-xs" @click="callphone">拨打</view>
						</view>
					</view>
					<view class="grid col-1">
						<view class="padding-sm item">
							<view>联系邮箱:mengxinmodelshe@163.com</view>
							<view class="cu-btn line-green sm radius margin-left-xs" @click="copy">复制</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Concat',
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		callphone() {
			uni.makePhoneCall({
				phoneNumber:'13486366005'
			})
		},
		copy(){
			uni.setClipboardData({
				data:'mengxinmodel@163.com'
			})
		}
	},
};
</script>

<style lang="scss" scoped>
.item {
	@include center(center);
}
</style>
