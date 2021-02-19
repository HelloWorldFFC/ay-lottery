<template>
	<view>
		<view class="box" :style="style_box">
				<view :animation="animationData" class="cs-ct" :style="style_wh">
					<view class="cs-line">
						<view class="cs-litem"  v-for="(item,index) in awardsList" :key="index" :style="[{transform:'rotate('+item.lineTurn+')'},{'background-color':themeColor},{left:(width/2) +'rpx'},{height:(height/2) +'rpx'},{'-webkit-transform-origin': '50% ' +(height/2) +'rpx'},{'transform-origin': '50% ' +(height/2) +'rpx'}]"></view>
					</view>
					<view class="cs-list">
						<view class="cs-item" :style="{color: themeColor }" v-for="(iteml,index2) in awardsList" :key="index2">
							<view class="cs-item-text" :style="[{transform:'rotate('+iteml.turn+')'},{'-webkit-transform-origin': '50% ' +(height/2) +'rpx'},{'transform-origin': '50% ' +(height/2) +'rpx'}]">
								<text class="txt">{{iteml.name}}</text>
								<image lazy-load="true" class="cs-item-text-img" :src="iteml.img" @tap="toDetailPage({index: index2})"></image>
							</view>
						</view>
					</view>
				</view>
				<view @tap="playReward" class="cs-btn" :style="[{left:((width/2)-40) +'rpx'},{top:((height/2)-40) +'rpx'}]" v-bind:class="btnDisabled">开始 </view>
				<view class="cs-btn-table" :style="[{left:((width/2)-50) +'rpx'},{top:((height/2)+50) +'rpx'},{color: themeColor }]">剩余{{chance_num}}次</view>
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
		
			height: {
				type: Number,
				default: 700
			},
			width: {
				type: Number,
				default: 700
			},
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			chance_num_init :{
				type: Number,
				default: 5
			},
		},
		data() {
			return {
				chance: true,
				
				awardsList: {},
				animationData: {},
				btnDisabled: '',
				chance_num: 5
			};
		},
		watch:{
			list(){
				this.init()
			},
			chance_num_init(e){
				this.chance_num = e ;
			},
		},
		created() {
			this.init();
			this.chance_num = this.chance_num_init ;
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
				style += `border: 8rpx solid ${that.themeColor};`;
				return style;
			},
			style_wh() {
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
				return style;
			},
			
		},
		
		methods: {
			//详情页
			toDetailPage(item) {
				let that = this ;
				let list = that.awardsList ;
				let index = item.index ;
				let data = {
					curIndex: index,
					item : list[index] ,
					list: list
				};
				this.$emit('toDetailPage', data);
			},
			//画抽奖圆盘  
			init: function() {
				var awards = this.list;
				var awardsList = [];
				var turnNum = 1 / awards.length * 360; // 文字旋转 turn 值  

				// 奖项列表  
				for (var i = 0; i < awards.length; i++) {
					awardsList.push({
						turn: i * turnNum + 'deg',
						lineTurn: i * turnNum + turnNum / 2 + 'deg',
						name: awards[i].name,
						img : awards[i].img,
					});
				}

				this.btnDisabled = this.chance ? '' : 'disabled';
				this.awardsList = awardsList;
			},

			//发起抽奖  
			playReward: function() {
				let that = this ;
				if (this.chance_num == 0) {
					uni.showToast({
						title: '次数已经用完',
						icon: 'none'
					})
					return
				}
				//中奖index  
				var awardsNum = that.list;
				var awardIndex = Math.round(Math.random() * (awardsNum.length - 1)); //随机数  
				var runNum = 8; //旋转8周  
				var duration = 4000; //时长  

				// 旋转角度  
				this.runDeg = this.runDeg || 0;
				this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum.length))
				//创建动画  
				var animationRun = uni.createAnimation({
					duration: duration,
					timingFunction: 'ease'
				})
				animationRun.rotate(that.runDeg).step();
				that.animationData = animationRun.export();
				that.btnDisabled = 'disabled';

				// 中奖提示  
				var isAward = that.list[awardIndex].isAward || false;
				that.chance_num = that.chance_num - 1;
				if (isAward) {
					setTimeout(function() {
						
						that.btnDisabled = '';
						let data = {
							curIndex: awardIndex,
							item: that.list[awardIndex],
							list: that.list
						};
						this.$emit('result', data);
					}.bind(that), duration);
				} else {
					setTimeout(function() {
						uni.showModal({
							title: '很遗憾',
							content: '没中 ' + (that.list[awardIndex].name),
							showCancel: false
						});
						that.btnDisabled = '';
					}.bind(that), duration);
				}

			}
		}

	}
</script>

<style>
	.txt{
		padding-top: 10upx;
		padding-bottom: 10upx;
	}
	
	/* 转盘 */
	.box {
		margin: 0 auto;
		position: relative;
		border-radius: 50%;
		box-shadow: 0 10upx 30upx #333, 0 0 10upx #000;
		
	}

	.cs-ct {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		display: block;
		border-radius: inherit;
		background-clip: padding-box;
	}

	.cs-element {
		position: relative;
		z-index: 1;
		width: inherit;
		height: inherit;
		border-radius: 50%;
	}

	.cs-list {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 9999;
	}

	.cs-item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-weight: bold;
		text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6);
	}

	.cs-item-text {
		position: relative;
		display: block;
		padding-top: 20upx;
		margin: 0 auto;
		text-align: center;
		
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cs-item-text text {
		font-size: 30upx;
	}

	.cs-item-text-img {
		width: 60upx;
		height: 60upx;
		
		border-radius: 50%;
	}

	/* 分隔线 */
	.cs-line {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 99;
	}

	.cs-litem {
		position: absolute;
		
		top: 0;
		width: 3upx;
		
		overflow: hidden;
		
	}

	/**  
* 抽奖按钮  
*/
	.cs-btn {
		position: absolute;
		background-color: #e44025;
		z-index: 400;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		color: #f4e9cc;
		line-height: 80upx;
		text-align: center;
		font-size: 26upx;
		text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
		text-decoration: none;
	}

	.cs-btn::after {
		position: absolute;
		display: block;
		content: ' ';
		left: 12upx;
		top: -44upx;
		width: 0;
		height: 0;
		overflow: hidden;
		border-width: 30upx;
		border-style: solid;
		border-color: transparent;
		border-bottom-color: #e44025;
	}

	.cs-btn.disabled {
		pointer-events: none;
		background: #b07a7b;
		color: #ccc;
	}

	.cs-btn.disabled::after {
		border-bottom-color: #b07a7b;
	}

	.cs-btn-table {
		
		width: 120upx;
		text-align: center;
		position: absolute;
		
		font-size: 26upx;
		background-color: #FFFFFF;
		opacity: 0.9;
	}
</style>
