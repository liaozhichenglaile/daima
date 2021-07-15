<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.StatusBar = e.statusBarHeight;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					Vue.prototype.Custom = capsule;
					Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				}
			}
		});
	},
	onShow: function() {},
	onHide: function() {}
};
</script>
<style>
@import 'static/css/main.css';
@import 'static/css/icon.css';
</style>
