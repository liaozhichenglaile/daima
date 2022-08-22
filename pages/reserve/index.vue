<template>
	<view>
		<custom-nav bgColor="bg-green">
			<template #content>
				预约
			</template>
		</custom-nav>
		<view class="box-content bg-white radius">
			<image
				class="image"
				src="https://xcx.mengxintonggao.cn/mini/reserve_bg.png"
				mode="aspectFill"
			></image>
			<form @submit="submit" @reset="formReset">
				<view class="cu-form-group">
					<view class="title text-black">联系人</view>
					<input placeholder="请输入联系人" v-model="name" name="name" />
				</view>
				<view class="cu-form-group">
					<view class="title text-black">微信号</view>
					<input placeholder="请输入微信号" v-model="tel"  name="tel" />
				</view>
				<view class="cu-form-group">
					<view class="title text-black">预算</view>
					<input placeholder="请输入预算" v-model="budget" type="digit" maxlength="10"  name="budget" />
				</view>
				<view class="cu-form-group" style="position:relative;padding: 1rpx 15rpx;">
					<textarea
						maxlength="300"
						name="need"
						v-model="need"
						:show-confirm-bar="false"
						placeholder="请输入需求描述"
					/>
					<view class="note-count">{{ need.length }}/300</view>
				</view>
				<view class="flex padding flex-direction">
					<button class="cu-btn lg" form-type="submit">提交需求</button>
				</view>
			</form>
		</view>
		<auth :isuser="true" :model.sync="showauth"></auth>
	</view>
</template>

<script>
import { businessub,userinfo } from '@/request/api.js';
import Auth from '@/components/Auth';
export default {
	components: { Auth },
	name: 'Reserve',
	data() {
		return {
			need: '',
			name:'',
			tel:'',
			budget:'',
			showauth:false,
			isure:false
		};
	},
	mounted() {
		this.setuser();
		uni.$on('authuser',()=>{
		      this.setuser();
		})
	},
	methods: {
		async setuser() {
			let res = await userinfo();
			if (!res.nickname || !res.head_img) {
				this.showauth = true;
				this.isure=true
			} else if (res.nickname && res.head_img) {
				this.showauth = false;
				this.isure = false;
			}
		},
		async submit(e) {
			if(this.isure){
				return this.showauth=true
			}
			let {tel,need,name,budget}=e.detail.value
			if(!name) return this.$util.$toast('请检查联系人');
			if(!tel) return this.$util.$toast('请检查手机号');
			if(!budget) return this.$util.$toast('请检查预算');
			if(!need) return this.$util.$toast('请检查需求');
			await businessub(e.detail.value);
			this.$util.$toast('提交成功');
			this.need=''
			this.name=''
			this.tel=''
			this.budget=''
		}
	}
};
</script>

<style scoped lang="scss">
.box-content {
	width: 94%;
	margin: 30rpx auto;
	.image {
		width: 100%;
		height: 500rpx;
		border-radius: 12rpx 12rpx 0 0;
	}
	.cu-form-group {
		textarea {
			border: 1rpx solid #f1f1f1;
			height: 6em;
			margin: 30rpx 0rpx;
			padding: 10rpx;
		}
		.note-count {
			position: absolute;
			right: 35rpx;
			bottom: 35rpx;
		}
	}
	.cu-btn {
		background-image: linear-gradient(0deg, #34b630 0%, #91d78e 100%);
		border-radius: 60px;
		color: #ffffff;
	}
}
</style>
