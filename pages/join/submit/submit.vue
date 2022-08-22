<template>
	<view>
		<view class="content bg-white radius padding-xs">
			<view class="tag-item">认证信息</view>
			<form @submit="submitaudit">
				<view class="cu-form-group" style="padding-top: 115rpx;">
					<view class="title">姓名</view>
					<input class="text-right" v-model="name" placeholder="请输入姓名" name="name" />
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<radio-group name="sex" class="block flex">
						<view class="flex align-center" style="width:130rpx">
							<radio class="radio" :checked="sex === 1 ? true : false" value="1" />
							<view class="margin-left-sm">男</view>
						</view>
						<view class="flex align-center">
							<radio class="radio" :checked="sex === 0 ? true : false" value="0" />
							<view class="margin-left-sm">女</view>
						</view>
					</radio-group>
				</view>
				<view class="cu-form-group">
					<view class="title">身份证号</view>
					<input
						class="text-right"
						placeholder="请输入身份证号"
						type="idcard"
						v-model="id_card"
						name="id_card"
					/>
				</view>
			<!-- 	<view class="cu-form-group padding"> -->
				<!-- 	<view class="flex img-content">
						<image
							:src="identity_front ? identity_front : '/static/index/card_1.png'"
							@click="!identity_front ? chooseimage(1) : ''"
							mode="aspectFill"
						></image>
						<view
							class="del-image cuIcon-close text-white"
							@click.stop="delimage(1)"
							v-if="identity_front"
						></view> -->
					<!-- </view> -->
				<!-- 	<view class="flex img-content"> -->
					<!-- 	<image
							:src="identity_back ? identity_back : '/static/index/card_2.png'"
							@click="!identity_back ? chooseimage(2) : ''"
							mode="aspectFill"
						></image>
						<view
							class="del-image cuIcon-close text-white"
							@click.stop="delimage(2)"
							v-if="identity_back"
						></view> -->
				<!-- 	</view> -->
			<!-- /view> -->
				<view class="cu-form-group padding">
					<view class="flex img-content">
						<image
							:src="moka ? moka : '/static/index/model.png'"
							@click="!moka ? chooseimage(3) : ''"
							mode="aspectFill"
						></image>
						<view
							class="del-image cuIcon-close text-white"
							@click.stop="delimage(3)"
							v-if="moka"
						></view>
					</view>
					<view class="flex img-content">
						<image
							:src="cover_img ? cover_img : '/static/index/cover.png'"
							@click="!cover_img ? chooseimage(4) : ''"
							mode="aspectFill"
						></image>
						<view
							class="del-image cuIcon-close text-white"
							@click.stop="delimage(4)"
							v-if="cover_img"
						></view>
					</view>
				</view>
				
				<view class="cu-form-group">
					<text style='color:#34b630' >【萌新通告】为会员制平台，模特入驻审核会产生100元审核服务费，审核若不通过则24小时内自动退回原账户。
					
					</text>
					
				</view>
				
				
				<view class="flex padding flex-direction">
					<button class="cu-btn lg" form-type="submit">提交审核</button>
				</view>
				<view class="grid col-1" v-if="identity === 1">
					<view class="padding-sm text-red">
						*你的资料已通过，如需修改请重新提交后等待审核！
					</view>
				</view>
			</form>
		</view>
		<tips :msg="msg" :show="show"></tips>
	</view>
</template>

<script>
import Tips from '@/components/tips';
import { starsub, starinfo,paysub,geturl } from '@/request/api.js';
export default {
	data() {
		return {
			msg: '',
			show: false,
			params: {},
			identity_front: '',
			identity_back: '',
			moka: '',
			cover_img: '',
			moka_ok: '',
			cover_img_ok: '',
			disabled: false,
			name: '',
			id_card: '',
			sex: '',
			identity: 0
		};
	},
	components: { Tips },
	onLoad(options) {
		
		starinfo({ is_me: 1 })
			.then(res => {
				if (res) {
					let {
						identity_front,
						identity_back,
						moka,
						cover_img,
						name,
						id_card,
						sex
					} = res;
					this.identity_front = identity_front;
					this.identity_back = identity_back;
					this.moka = moka;
					this.cover_img = cover_img;
					this.moka_ok = moka;
					this.cover_img_ok = cover_img;
					this.name = name;
					this.sex = sex;
					this.id_card = id_card;
					this.identity = +options.ident;
					this.params = JSON.parse(decodeURIComponent(options.msg));
				}
			})
			.catch(() => {
				this.params = JSON.parse(decodeURIComponent(options.msg));
			});
			
			/**
			 * 监听裁剪
			 */
			 uni.$on('bindfinish', async res => {
			    this.cover_img_ok='1';
				this.cover_img = res;
		        this.cover_img_ok = await this.$util.$upload([res]);
				
			
			
			});
	},
	methods: {
		/**
		 * @param {Object} e
		 */
		 chooseimage(type) {
			console.log(type)
				
			 uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: async res => {
					
					const size = res.tempFiles[0].size;
					
				
				
					if (size > 1000000) {
						uni.showToast({
							title: '上传图片不能大于1M',
							icon: 'none'
						});
						return;
					}
					 switch (type) {
						case 1:
							this.identity_front = res.tempFilePaths[0];
							break;
						case 2:
							this.identity_back = res.tempFilePaths[0];
							break;
						case 3:
					
						this.moka_ok = await this.$util.$upload([res.tempFilePaths[0]]);
						
						this.moka =res.tempFilePaths[0];
							break;
						case 4:
						// 上传封面照裁剪
						uni.navigateTo({
							url:'../cropper/cropper?url='+res.tempFilePaths[0]
						})
							break;
					}
				}
			});
		},
		delimage(type) {
			switch (type) {
				case 1:
					this.identity_front = '';
					break;
				case 2:
					this.identity_back = '';
					break;
				case 3:
					this.moka = '';
					break;
				case 4:
					this.cover_img = '';
					break;
			}
		},
		async submitaudit(e) {
			uni.$emit('finish', true);
			let v = e.detail.value;
			if (!v.name) {
				return this.$util.$toast(`请检查姓名`);
			}
			if (!v.sex) {
				return this.$util.$toast(`请检查性别`);
			}
			if (!v.id_card) {
				return this.$util.$toast(`请检查身份证号`);
			}
			// if (!this.identity_front) {
			// 	return this.$util.$toast(`请上传身份证正面`);
			// }
			// if (!this.identity_back) {
			// 	return this.$util.$toast(`请上传身份证反面`);
			// }
			if (!this.moka_ok) {
				return this.$util.$toast(`请上传摩卡`);
			}
			if (!this.cover_img_ok) {
				return this.$util.$toast(`请上传封面图形象照`);
			}
			
			if (this.cover_img_ok==1) {
				return this.$util.$toast(`正在上传形象照,请稍后提交`);
			}
			//this.identity_front, this.identity_back,
			
			// let img = [ this.moka, this.cover_img];
			// img = await this.$util.$upload(img);
			// img = img.split(',');
			// let param = {
			// 	...this.params,
			// 	...v,
			// 	// identity_front: img[0],
			// 	// identity_back: img[1],
			// 	moka: img[0],
			// 	cover_img: img[1]
			// };
		
			let param = {
				...this.params,
				...v,
				// identity_front: img[0],
				// identity_back: img[1],
				moka: this.moka_ok,
				cover_img: this.cover_img_ok
			};
			
			var _this =this
			if (this.disabled) return;
			this.disabled = true;
			
			uni.showLoading({
				title: '提交中',
				mask: true
			})
			
			starsub(param);
		    uni.request({
				url:geturl()+'/pay/pay',
			      data:{},
			        method:'post',
			        header:{
			           'content-type':'application/x-www-form-urlencoded',
					   'Authorization': uni.getStorageSync('star_token')
			        
			        },
			        success:function(res){
						  if(res.data.data.code!='1001'){
							    uni.hideLoading()
							  uni.requestPayment({
							      provider: 'wxpay',    //支付类型-固定值
							      timeStamp: res.data.data.timeStamp, // 时间戳（单位：秒）
							      nonceStr: res.data.data.nonceStr, // 随机字符串
							      package: res.data.data.package, // 固定值
							      signType: res.data.data.signType, //固定值
							      paySign: res.data.data.paySign, //签名
							      success: function (res) {
									    uni.hideLoading()
							          //console.log('success:' + JSON.stringify(res));
							    console.log("支付成功");
							  	setTimeout(() => {
							  		uni.navigateTo({
							  			url: '/pages/index/index'
							  		});
							  		}, 1000);
							  	 },
							      fail: function (err) {
									    uni.hideLoading()
									   _this.disabled = false;
							         //console.log('fail:' + JSON.stringify(err));
							        
							      }
							  });
							  
						  }else{
						   starsub(param);
						   uni.showToast({
						     	title: '资料已经提交成功，我们将会尽快审核！',
						     	icon: 'none'
						     });
						     uni.hideLoading()
						   setTimeout(() => {
						   uni.navigateTo({
						   	url: '/pages/index/index'
						   });
						   }, 1000);
							  
						  }
					
			         //  resolve(res)
			        },
			        error:function(error){
					   uni.hideLoading()
			           reject('error')
			        }
			    })
				
				// try {
				// 	await starsub(param);
				// 	this.msg = '资料已经提交成功，我们将会尽快审核！';
				// 	this.show = true;
				// 	setTimeout(() => {
				// 		uni.navigateBack();
				// 	}, 1000);
				// } catch (e) {
				// 	this.disabled = false;
				// } 
			
			
			
		}
	}
};
</script>
<style scoped lang="scss">
@import '../index.scss';
</style>
