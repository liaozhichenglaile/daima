<template>
	<view class="content">
		<view class="cu-load">
			<view class="gray-text">
				<view class="loading">
					<text></text>
					<text></text>
					<text></text>
					<text></text>
					<text></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'loading'
};
</script>

<style scoped>
.content {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 30;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
}
.gray-text {
	display: flex;
	align-items: center;
	text-align: center;
	margin: 0 auto;
}
.cu-load {
	display: flex;
	text-align: center;
	height: 100%;
	width: 100%;
}
.loading {
	width: 150px;
	height: 15px;
	margin: 0 auto;
	text-align: center;
}
.loading text {
	display: inline-block;
	width: 15px;
	height: 100%;
	margin-right: 5px;
	background: lightgreen;
	-webkit-animation: load 1.04s ease infinite;
}
.loading text:last-child {
	margin-right: 0px;
}
@-webkit-keyframes load {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
.loading text:nth-child(1) {
	-webkit-animation-delay: 0.13s;
}
.loading text:nth-child(2) {
	-webkit-animation-delay: 0.26s;
}
.loading text:nth-child(3) {
	-webkit-animation-delay: 0.39s;
}
.loading text:nth-child(4) {
	-webkit-animation-delay: 0.52s;
}
.loading text:nth-child(5) {
	-webkit-animation-delay: 0.65s;
}
</style>
