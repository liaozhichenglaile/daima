<template>
	<view>
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
			<view
				class="cu-bar fixed"
				:style="style"
				:class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]"
			>
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]">
					<slot name="content"></slot>
				</view>
				<view class="search" :style="[{ top: SearchBar + 'px' }]">
					<slot name="search"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CustomNav',
	data() {
		return {
			StatusBar: this.StatusBar,
			SearchBar: this.StatusBar - 10,
			CustomBar: this.CustomBar
		};
	},
	computed: {
		style() {
			let StatusBar = this.StatusBar;
			let CustomBar = this.CustomBar;
			let bgImage = this.bgImage;
			let style = `height:${CustomBar}px;padding-top:${this.search?this.SearchBar:StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		search:{
			type:Boolean,
			default:false
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		}
	},
	methods: {
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style></style>
