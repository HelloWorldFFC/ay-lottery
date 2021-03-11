<template>
	<view>
		<view class="box" :style="style_box">
			<view class="dot" :class="'dot-'+(index+1)" v-for="(item,index) in dotList" :key="index"></view>
			<view class="box-in" :style="style_box_in">
				
				<view  class="ct-out"  :class="['award-'+(index+1),index==indexSelect?'awardSelect':'']" v-for="(item,index) in list"
				 :key="index" :style="[{'background-image':'url('+(is_img_bg?item.img_bg:'')+')'},{'box-shadow': '0 8rpx 0 ' + box_shadow_Color}]">
				 <!-- {{item.name}} -->
					<image lazy-load="true" @tap="toDetailPage({index: index})" class="award-image" :src="item.img"></image>
				</view>
				
				
				<view :style="[{'box-shadow': '0 8rpx 0 ' + box_shadow_Color}]" class="btn-start" :class="isRunning?'ative':''" @click="start">开始</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
		
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			bgColor: {
				type: String,
				default: '#1E90FF',
			},
			bg_sd_Color: {
				type: String,
				default: '#4169E1',
			},
			height: {
				type: Number,
				default: 600
			},
			width: {
				type: Number,
				default: 650
			},
			//跑马灯启用图片背景
			is_img_bg: { 
				type: Boolean,
				default: false
			},
			//背景图片
			theme_img_bg: {
				type: String,
				default: '',
			},
			box_shadow_Color: {
				type: String,
				default: '#fcc8d0',
			},
			//底部背景图片
			bg_img: {
				type: String,
				default: '',
			},
			//停留位置
			stay_index :{
				type: Number,
				default: 1
			},
		},
		data() {
			return {
				dotList: 24, //圆点个数
				//奖品
				indexSelect: 0, //抽中的奖品下标
				isRunning: false //抽中状态
			}
		},
		computed: {
			style_box() {
				let that = this;
				var height = parseInt(that.height);
				var width = parseInt(that.width);
				var style = '';
				if (height > 0) {
					style = `height:${height}rpx;`;
				}
				if (width > 0) {
					style += `width:${width}rpx;`;
				}
				style += `background-color:${that.bgColor};`;
				
				if(that.is_img_bg && that.bg_img.length>0){
					style += `background-image:url(${that.bg_img});`;
				}
				
				style += `box-shadow: 0 10px 0  ${that.bg_sd_Color};`;
				return style;
			},
			style_box_in() {
				let that = this;
				var height = parseInt(that.height);
				var width = parseInt(that.width);
				var style = '';
				if (height > 70) {
					style = `height:${height-70}rpx;`;
				}
				if (width > 70) {
					style += `width:${width-70}rpx;`;
				}
				
				style += `background-color:${that.themeColor};`;
				
				var theme_img_bg = that.theme_img_bg;
				if(that.is_img_bg && theme_img_bg.length>0){
					style += `background-image:url(${that.theme_img_bg});`;
				}
				return style;
			},
			
		},
		methods: {
			//详情页
			toDetailPage(item) {
				let that = this ;
				let list = that.list ;
				let index = item.index ;
				let data = {
					curIndex: index,
					item : list[index] ,
					list: list
				};
				this.$emit('toDetailPage', data);
			},
			//随机数
			random(u) {
				let rnd = Math.random() > 0.5 ? "2" : "1";
				u = u || 3;
				for (var i = 0; i < u; i++) {
					rnd += Math.floor(Math.random() * 10);
				}
				return Number(rnd);
			},

			//开始
			start() {
				let that = this ;
				if (this.isRunning) return
				this.isRunning = true;
				let indexSelect = 0;
				let i = 0;
				let randomNum = this.random(3);
				let timer = setInterval(() => {
					++indexSelect;
					//这里用y=30*x+150函数做的处理.可根据自己的需求改变转盘速度
					indexSelect = indexSelect % 8;
					this.indexSelect = indexSelect;
					
					
					i += 40;
					//console.log(i)
					if (i > randomNum) {
						
						//去除循环
						
						//控制停留位置
						indexSelect =  that.stay_index;
						this.indexSelect =  indexSelect;
						
						// console.log(randomNum)
						// console.log(indexSelect)
						// console.log(JSON.stringify(that.list[indexSelect]) )
						
						clearInterval(timer)
						timer = null;
						let data = {
							curIndex: indexSelect,
							item: that.list[indexSelect],
							list: that.list
						};
						this.$emit('result', data);
						this.isRunning = false
						
					}
				}, (70 + i))
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 40rpx auto;
		border-radius: 40rpx;
		position: relative;
	}

	.box-in {
		border-radius: 40rpx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/**小圆点 start*/

	.dot {
		position: absolute;
		display: block;
		border-radius: 50%;
		height: 20rpx;
		width: 20rpx;
	}

	.dot:nth-child(odd) {
		background: #fff;
		animation: 0.5s odd linear infinite;
	}

	.dot:nth-child(even) {
		background: #fcf400;
		animation: 0.5s even linear infinite;
	}

	.dot-1 {
		left: 15rpx;
		top: 15rpx;
	}

	.dot-2 {
		left: 117.5rpx;
		top: 7.5rpx;
	}

	.dot-3 {
		left: 220rpx;
		top: 7.5rpx;
	}

	.dot-4 {
		left: 322.5rpx;
		top: 7.5rpx;
	}

	.dot-5 {
		left: 425rpx;
		top: 7.5rpx;
	}

	.dot-6 {
		left: 527.5rpx;
		top: 7.5rpx;
	}

	.dot-7 {
		left: 620rpx;
		top: 15rpx;
	}

	.dot-8 {
		left: 622rpx;
		top: 109rpx;
	}

	.dot-9 {
		left: 622rpx;
		top: 203rpx;
	}

	.dot-10 {
		left: 622rpx;
		top: 297rpx;
	}

	.dot-11 {
		left: 622rpx;
		top: 391rpx;
	}

	.dot-12 {
		left: 622rpx;
		top: 485rpx;
	}

	.dot-13 {
		left: 620rpx;
		top: 565rpx;
	}

	.dot-14 {
		left: 517.5rpx;
		top: 572rpx;
	}

	.dot-15 {
		left: 415rpx;
		top: 572rpx;
	}

	.dot-16 {
		left: 312.5rpx;
		top: 572rpx;
	}

	.dot-17 {
		left: 210rpx;
		top: 572rpx;
	}

	.dot-18 {
		left: 107.5rpx;
		top: 572rpx;
	}

	.dot-19 {
		left: 15rpx;
		top: 565rpx;
	}

	.dot-20 {
		left: 7.5rpx;
		top: 471rpx;
	}

	.dot-21 {
		left: 7.5rpx;
		top: 377rpx;
	}

	.dot-22 {
		left: 7.5rpx;
		top: 283rpx;
	}

	.dot-23 {
		left: 7.5rpx;
		top: 189rpx;
	}

	.dot-24 {
		left: 7.5rpx;
		top: 95rpx;
	}

	@-webkit-keyframes odd {
		0% {
			background: #fff;
		}

		100% {
			background: #fcf400;
		}
	}

	@keyframes odd {
		0% {
			background: #fff;
		}

		100% {
			background: #fcf400;
		}
	}

	@-webkit-keyframes even {
		0% {
			background: #fcf400;
		}

		100% {
			background: #fff;
		}
	}

	@keyframes even {
		0% {
			background: #fcf400;
		}

		100% {
			background: #fff;
		}
	}

	/**小圆点 end*/

	.ct-out {
		position: absolute;
		height: 150rpx;
		width: 168rpx;
		background-color: #fcecec;
		border-radius: 15rpx;
		box-shadow: 0 4px 0 #fcc8d0;
		
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/* 580 530  */

	.award-1 {
		left: 24rpx;
		top: 24rpx;
	}

	.award-2 {
		left: 206rpx;
		top: 24rpx;
	}

	.award-3 {
		left: 388rpx;
		top: 24rpx;
	}

	.award-4 {
		left: 388rpx;
		top: 188rpx;
	}

	.award-5 {
		left: 388rpx;
		top: 352rpx;
	}

	.award-6 {
		left: 206rpx;
		top: 352rpx;
	}

	.award-7 {
		left: 24rpx;
		top: 352rpx;
	}

	.award-8 {
		left: 24rpx;
		top: 188rpx;
	}

	/**居中 加粗*/

	.btn-start {
		position: absolute;
		top: 188rpx;
		left: 206rpx;
		border-radius: 15rpx;
		height: 150rpx;
		width: 168rpx;
		background-color: #fc4034;
		// box-shadow: 0 4px 0 #fcc8d0;
		color: #fcf400;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 150rpx;
	}

	.ative {
		opacity: 0.6 !important;
	}

	.award-image {
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 50rpx;
		width: 50rpx;
		border-radius: 50%;
	}

	.awardSelect {
		background-color: #fcf400 !important;
		box-shadow: 0 4px 0 rgb(240, 208, 12) !important;
	}
</style>
