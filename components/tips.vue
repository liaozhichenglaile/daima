<template>
	<view>
		<view class="fixed-tip success" :class="{'start-on':show}">
			{{msg}}
		</view>
	</view>
</template>

<script>
export default {
	name: 'tips',
	props: {
		msg: {
			type: String,
			default:''
		},
		show:{
			type:Boolean,
			default:false
		}
	},
};
</script>

<style lang="scss" scoped>
	.fixed-tip{
		height:70rpx;
		width: 100%;
		text-align: center;
		line-height:70rpx;
		position: fixed;
		top: 0;
		color: #FFFFFF;
		transform: translate3d(0, -100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
	}
	.success{
		background-color: #f8c5c5;
	}
	.error{
		background-color: #FF0000;
	}
	.start-on {
		transform: translate3d(0, 0, 0) !important;
	}
</style>
