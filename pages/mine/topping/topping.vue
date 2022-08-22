
<template>
	<view class="content">
		<view class="nav">
			<!-- 选项卡水平方向滑动，scroll-with-animation是滑动到下一个选项时，有一个延时效果 -->
			<scroll-view class="tab-scroll" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
				<view class="tab-scroll_box">
					<!-- 选项卡类别列表 -->
					<view class="tab-scroll_item" v-for=" (item,index) in category" :key="index"  :class="{'active':isActive==index}" @click="chenked(index)">
							{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 选项卡内容轮播滑动显示，current为当前第几个swiper子项 -->
		<swiper @change="change" :current="isActive" class="swiper-content" :style="fullHeight">
			<swiper-item class="swiperitem-content">
				<scroll-view scroll-y style="height: 100%;">
					<view class="nav_item" >
						<!-- 选项卡1页面 -->
				<view style="font-size: 16px;font-weight: 500;">购买需知</view>
				
				<view  style='margin-top: 5px;'>
				<view   @click="bangdan(5)" 
				:class="number==5 ? 'active_test' : 'active_test1'"  class="btn_c"  style='
				margin-left:10px ;
				'>榜单1-5
				</view>
				
				<view @click="bangdan(10)" :class="number==10 ? 'active_test' : 'active_test1'" class="btn_c"   style='
				margin-left:60px ;
			   '>榜单6-10
				</view>
				</view>
				
						
						
				<view style="font-size: 16px;font-weight: 500;margin-top: 40px;">置顶时间</view>
				<view  style="margin-top: 5px">
				<view   @click="bangdan(1)" 
				:class="number1==1 ? 'active_test2' : 'active_test3'"  class="btn_cs" style='margin-left:10px ;'>{{price}}元
				<view style="position:absolute;left:73rpx;top:48rpx;">7天</view>
				</view>
						
						
				<view  @click="bangdan(2)" 
				:class="number1==2 ? 'active_test2' : 'active_test3'" class="btn_cs" style='margin-left:5px;'>{{price1}}元
				<view style="position:absolute;left:73rpx;top:48rpx;">30天</view></view>
				
				
				<view  @click="bangdan(3)" 
				:class="number1==3 ? 'active_test2' : 'active_test3'" class="btn_cs" style='margin-left:5px;'> 
			
				自定义
				<view style="position:absolute;left:50rpx;top:48rpx;">{{price2}}元/天</view>
				</view>
				</view>
				
				
				<view :class="dp1==1 ? 'display' : 'undisplay'">
				<view style="font-size: 16px;font-weight: 500;margin-top: 40px;">天数</view>
				
				<input type="number" @input="onInput" class='input'  v-model="num" name="num" placeholder="请输入天数" />
				<text  class='input1'>{{price3}}元</text>
				</view>	
						
					
						
			<view>
				<view style="margin-top:50rpx;color:#34b630" >购买需知：本功能仅作为置顶展示资料之用途，增加曝光率。模特是否能接到活动，取决于多种因素，如个人形象、职业水平、市场竞争等，请按自己的实际情况酌情购买。本服务购买后不予退款。
				<view style="margin-top:30rpx;" >
				<checkbox :checked="isChecked" @click="Checked()" />
				<text style="margin-left:10rpx;" >我已知悉并同意</text>
				</view>
				</view>
			</view>
				</view>
					
				</scroll-view>	
			</swiper-item>
			
			
			<!-- 	选项卡2页面 -->
			<swiper-item class="swiperitem-content">
				<scroll-view scroll-y style="height: 100%;">
					<view class="nav_item" >
				<!-- 		选项卡2页面 -->
			<view style="font-size: 16px;font-weight: 500;">榜单位置</view>
								
								<view  style='margin-top: 5px;'>
								<view   @click="bangdan(5)" 
								:class="number==5 ? 'active_test' : 'active_test1'"  class="btn_c"  style='
								margin-left:10px ;
								'>榜单1-5
								</view>
								
								<view @click="bangdan(10)" :class="number==10 ? 'active_test' : 'active_test1'" class="btn_c"   style='
								margin-left:60px ;
				'>榜单6-10
								</view>
								</view>
								
										
										
								<view style="font-size: 16px;font-weight: 500;margin-top: 40px;">置顶时间</view>
								<view  style="margin-top: 5px">
								<view   @click="bangdan(1)" 
								:class="number1==1 ? 'active_test2' : 'active_test3'"  class="btn_cs" style='margin-left:10px ;'>{{price}}元
								<view style="position:absolute;left:73rpx;top:48rpx;">7天</view>
								</view>
										
										
								<view  @click="bangdan(2)" 
								:class="number1==2 ? 'active_test2' : 'active_test3'" class="btn_cs" style='margin-left:5px;'>{{price1}}元
								<view style="position:absolute;left:73rpx;top:48rpx;">30天</view></view>
								
								
								<view  @click="bangdan(3)" 
								:class="number1==3 ? 'active_test2' : 'active_test3'" class="btn_cs" style='margin-left:5px;'> 
							
								自定义
								<view style="position:absolute;left:50rpx;top:48rpx;">{{price2}}元/天</view>
								</view>
								</view>
								
								
								<view :class="dp1==1 ? 'display' : 'undisplay'">
								<view style="font-size: 16px;font-weight: 500;margin-top: 40px;">天数</view>
								
								<input type="number" @input="onInput" class='input'  v-model="num" name="num" placeholder="请输入天数" />
								<text  class='input1'>{{price3}}元</text>
								</view>	
				<!-- 		<view> -->
							 <!-- <view class="bdsl">榜单位示例</view>
							<image style="margin-top:20rpx;position:absolute;left:75rpx;" src="/static/index/lb.jpg" mode="widthFix"></image> -->
							<view>
							<view style="margin-top:50rpx;color:#34b630" >购买需知：本功能仅作为置顶展示资料之用途，增加曝光率。模特是否能接到活动，取决于多种因素，如个人形象、职业水平、市场竞争等，请按自己的实际情况酌情购买。本服务购买后不予退款。
							<view style="margin-top:30rpx;" >
							<checkbox :checked="isChecked" @click="Checked()" />
							<text style="margin-left:10rpx;" >我已知悉并同意</text>
							</view>
							</view>
						</view>
					</view>
				</scroll-view>	
			</swiper-item>
		
		
		
			
		</swiper>
		
		
		<view class="flex padding flex-direction">
			<button class="cu-btn-s" @click="submit()">立即置顶{{price4}}</button>
		</view>
	</view>
</template>
<script>
import { geturl } from '@/request/api.js';
	export default {
		watch:{
			// swiper与上面选项卡联动
			currentindex(newval){
				this.isActive = newval;
				this.scrollLeft = 0;
				// 滑动swiper后，每个选项距离其父元素最左侧的距离
				for (let i = 0; i < newval - 1; i++) {
					this.scrollLeft += this.category[i].width
				};
			},
		},
		data() {	
			return {
				isChecked:true,
				number: 5,
				number1: 0,
				price:799,
				price1: 2899,
				price2: 129,
			    price3: 0,
				price4:'',
				num:'',
				dp1:0,
				isActive: 0,
				index: 0,
				currentindex:0,
				category:[
					{
						id:1,
						name:'艺人榜单',
					},
					{
						id:2,
						name:'艺人列表',
					},
					
				],
				contentScrollW: 0, // 导航区宽度
				scrollLeft: 0, // 横向滚动条位置
				fullHeight:"",	
			}
		},
		mounted() {
			var that = this;
			 //获取手机屏幕的高度，让其等于swiper的高度，从而使屏幕充满
			uni.getSystemInfo({
			      success: function (res) {
				         that.fullHeight ="height:" + res.windowHeight + "px";
				  }
				});
			// 获取标题区域宽度，和每个子元素节点的宽度
			this.getScrollW()
		},
		methods: {
			Checked(){
				if(this.isChecked){
					this.isChecked=false;
				}else{
					this.isChecked=true;
				}
				console.log(this.isChecked)
			},
			submit(){
				// console.log('需要支付的钱',this.price4)
				// console.log('列表区别',this.isActive)
				// console.log('前几',this.number)
				// console.log('下前几',this.number1)
				if(!this.isChecked){
					uni.showToast({
					  	title: '请先勾选协议',
					  	icon: 'none'
					  });
					   return ;
				}	
						
				if(!this.price4 || !this.number){
					uni.showToast({
					  	title: '请先选择套餐再进行支付',
					  	icon: 'none'
					  });
					  return ;
				}
				uni.request({
					url:geturl()+'/pay/setmealPay',
				     data:{
						type:this.isActive,
						money:this.price4,
						list:this.number,
						index:this.number1
						 
					 },
				       method:'post',
				       header:{
				        'content-type':'application/x-www-form-urlencoded',
						'Authorization': uni.getStorageSync('star_token')
				       },
				  success:function(res){
					  console.log(res)
					if(res.data.code==1002){
						 	  uni.showToast({
						    	title: res.data.message,
						    	icon: 'none'
						    });
					return;
					}
				  uni.requestPayment({
					  provider: 'wxpay',    //支付类型-固定值
					  timeStamp: res.data.data.timeStamp, // 时间戳（单位：秒）
					  nonceStr: res.data.data.nonceStr, // 随机字符串
					  package: res.data.data.package, // 固定值
					  signType: res.data.data.signType, //固定值
					  paySign: res.data.data.paySign, //签名
					  success: function (res) {
						 console.log("支付成功");
						  uni.showToast({
						    	title: '支付成功',
						    	icon: 'none'
						    });
							setTimeout(() => {
							uni.navigateTo({
								url: '/pages/index/index'
							})
							}, 1000);
					  },
					  fail: function (err) {
						
						   _this.disabled = false;
						 //console.log('fail:' + JSON.stringify(err));
						
					  }
				  });
				  },
				       error:function(error){
				          reject('error')
				       }
				   })
				
			},
			// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
			getScrollW() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tab-scroll').boundingClientRect(data => {
					  // 拿到 scroll-view 组件宽度
					  this.contentScrollW = data.width
				 }).exec();
				 query.selectAll('.tab-scroll_item').boundingClientRect(data => {
					 let dataLen = data.length;
					  for (let i = 0; i < dataLen; i++) {
						  //  scroll-view 子元素组件距离左边栏的距离
						  this.category[i].left = data[i].left;
						 //  scroll-view 子元素组件宽度
						 this.category[i].width = data[i].width
					}
				 }).exec()
			},
			// 当前点击子元素靠左留一个选项展示，子元素宽度不相同也可实现
			chenked(index) {
				console.log(index)
				this.isActive = index;
				this.scrollLeft = 0;
				for (let i = 0; i < index - 1; i++) {
					this.scrollLeft += this.category[i].width
				};
			},
			onInput(e){
				 this.num = e.target.value
				   console.log(this.num)
				   if(this.price2==129){
				   	 this.price3=this.numFilter(129*this.num);
				   }else{
				   	this.price3=this.numFilter(69.9*this.num);  
				   }
				    this.price4=this.price3;
			},
			numFilter (value) {
				// 截取当前数据到小数点后三位
				let tempVal = parseFloat(value).toFixed(3)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal
			},
			
			bangdan(index){
				console.log(index)
			     if(index==5){
					this.price= 799; 
					this.price1= 2899; 
					this.price2= 129; 
					this.number= index;
					if(this.num){
						if(this.price2==129){
							 this.price3=this.numFilter(129*this.num);
						}else{
							this.price3=this.numFilter(69.9*this.num);  
						}
						 this.price4=this.price3;
					}
				
					if(this.number1==1){
						this.price4='799元';
					}else if(this.number1==2){
						this.price4='2899元';
					}
					
				   }else if(index==10){
					this.price= 399;
					this.price1= 1899;  
					this.price2= 69.9; 
					 this.number= index;
					 
					 if(this.num){
					 	if(this.price2==129){
					 		 this.price3=this.numFilter(129*this.num);
					 	}else{
					 		this.price3=this.numFilter(69.9*this.num);  
					 	}
					 	 this.price4=this.price3;
					 }
					 
					 if(this.number1==1){
					 	this.price4='399元';
					 }else if(this.number1==2){
					 	this.price4='1899元';
					 }
					 
				   }else if(index==3){
					   this.dp1=1;
					 if(this.price2==129){
					 	 this.price3=this.numFilter(129*this.num);
					 }else{
					 	this.price3=this.numFilter(69.9*this.num);  
					 }
					 this.price4=this.price3;
					this.number1= index;
					  
				   }else if(index==1){
					 this.dp1=0;
					
					this.number1= index;
				
					if(this.number==5){
						this.price4='799元';
					}else if(this.number==10){
						this.price4='399元';
					}
					  
				   }else if(index==2){
					  this.dp1=0;
					  if(this.number==5){
					   this.price4='2899元';
					  }else if(this.number==10){
					  	this.price4='1899元';
					  }
					
					this.number1= index;
					  
				   }
			},
			// swiper滑动时，获取其索引，也就是第几个
			change(e){
				const {current} = e.detail;
				this.currentindex = current;
			},	
		}
	}
</script>
<style lang="scss">
	.cu-btn-s {
	    position: fixed;
		bottom:55rpx;
	    border: 0rpx;
	    display: inline-flex;
	    align-items: center;
	    justify-content: center;
	    box-sizing: border-box;
	    padding: 0 30rpx;
	    font-size: 16px;
	  
	    line-height: 1;
	    text-align: center;
	    text-decoration: none;
	    overflow: visible;
	    margin-left: initial;
	    margin-right: initial;
		font-family: PingFangSC-Medium;
		background-color: #5EB246;color: #FFFFFF;height:78rpx;width: 694rpx;
	}
	page{
		height: 100%;
		display: flex;
		background-color: #FFFFFF;
	}
	.content{
		display: flex;
		flex-direction: column;
		width: 100%;
		
		flex: 1;
		.nav{
			border-top: 1rpx solid #f2f2f2;
			background-color: #FFFFFF;	
			position: fixed;
			z-index: 99;
			width: 100%;
			align-items: center;
			height: 80rpx;
			.tab-scroll{
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				padding-left: 30rpx;
				padding-right: 30rpx;
				.tab-scroll_box{
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					box-sizing: border-box;
					.tab-scroll_item{
						margin-left: 105rpx;
						line-height: 60rpx;
						margin-right: 105rpx;
						flex-shrink: 0;
						padding-bottom:10px;
						display: flex;
						justify-content: center;
						font-size: 14px;
						padding-top: 10px;
					}
				}
			}
		}
	
		.swiper-content{
			   padding-top: 120rpx;
			   flex: 1;
			.swiperitem-content{
			    background-color: #ffffff;
				.nav_item{	
					background-color: #FFFFFF;
					padding:20rpx 40rpx 0rpx 40rpx ;
				}
			}
		}	
	}
	.active {
		position: relative;
		color: #5EB246;
		font-weight: 500;
	}
	
	
	.active::after {
		content: "";
		position: absolute;
		width: 130rpx;
		height: 4rpx;
		background-color: #5EB246;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
	
	
	.active_test {
	
	color: white;
	background-color: #5EB246;
	}
	
	.active_test1 {
	color: #5EB246;
	background-color:#f0f0f0 ;
	
	}
	
	.active_test2 {
	
	color: white;
	background-color: #5EB246;
	}
	
	.active_test3 {
	color: #5EB246;
	background-color:#f0f0f0 ;
	
	}
	
	.btn_c  {
		  position: relative;
		    border: 0rpx;
		    display: inline-flex;
		    align-items: center;
		    justify-content: center;
		    box-sizing: border-box;
		    padding: 0 30rpx;
		    font-size: 28rpx;
		    height: 64rpx;
		    line-height: 1;
		    text-align: center;
		    text-decoration: none;
		    overflow: visible;
		    margin-left: initial;
		    margin-right: initial;
			
			font-family: PingFangSC-Medium;
			border-radius: 4px;
			font-weight: 500;
			width: 258rpx;
			height: 86rpx;
	}
	.btn_cs  {
		  position: relative;
		    border: 0rpx;
		    display: inline-flex;
		    align-items: center;
		    justify-content: center;
		    box-sizing: border-box;
		    padding: 0 30rpx;
		    font-size: 28rpx;
		    height: 64rpx;
		    line-height: 1;
		    text-align: center;
		    text-decoration: none;
		    overflow: visible;
		    margin-left: initial;
		    margin-right: initial;
			
		padding: 5px 10px 15px 10px;
		font-weight: 500;
		width:202rpx;
		height: 80rpx;
		border-radius: 4px;
	}
	.input{
		position: relative;
		left:38px;
		bottom: 27px;
		width: 130px;
		height: 38px;
		border: 1px solid #EEEEEE;
		border-radius: 2px;
	}
	.input1{
		position: relative;
		left:178px;
		bottom: 52px;
	}
	.display{
		display: block;
	}
	
	.undisplay{
		display: none;
	}
	.bdsl{
		width: 82px;
		height: 22px;
		font-family: PingFangSC-Medium;
		font-weight: 500rpx;
		font-size: 16px;
		color: #333333;
		letter-spacing: 0.26px;
	    margin-top: 20rpx;
		margin-left: 251rpx;
		
	}
	
	
</style>
