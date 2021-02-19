<template>
	<view>
		<view v-if="show_again" class="re-turn" :style="[{'background-color': themeColor},{color: btn_Color }]" @click="again">{{again_txt}}</view>
		<view class="box">
			<view @click="tamin(index)" v-for="(item,index) in 9" :key="index" class="box-item" :class="[really == index+1?'animt':'', really != index+1 && surplus?'animt':'', really == ''?'item'+(index+1):'']" :style="really == index+1 && implement > 1?style_seled:style_un_seled">
				{{really == index+1?can_z:''}}{{really != index+1 && really != ''?no_z:''}}{{really == ''?tips:''}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			
			btn_Color: {
				type: String,
				default: '#ffffff',
			},
			seled_Color: {
				type: String,
				default: '#f43f3b',
			},
			seled_t_Color: {
				type: String,
				default: '#98FB98',
			},
			un_seled_Color: {
				type: String,
				default: '#00BFFF',
			},
			un_seled_t_Color: {
				type: String,
				default: '#33CCCC',
			},
			result_txt: {
				type: String,
				default: '结果',
			},
			show_again: {
				type: Boolean,
				default: false
			},
			again_txt: {
				type: String,
				default: '重新开始',
			},
			tips_init: {
				type: String,
				default: '点击',
			},
			no_z_init: {
				type: String,
				default: '谢谢参与',
			},
			height: {
				type: Number,
				default: 150
			},
			width: {
				type: Number,
				default: 350
			},
		},
		watch:{
			result_txt(e){
				this.can_z = e ;
			},
			tips_init(e){
				this.tips = e ;
			},
			no_z_init(e){
				this.no_z = e ;
			},
		},
		created:function(){
			let tips_init = this.tips_init
			this.tips = tips_init ;
			this.can_z = tips_init ;
			this.no_z = this.no_z_init ;
		},
		computed: {
			style_seled() {
				let that = this;
				var style = '';
				style = `background-image: linear-gradient(45deg, ${that.seled_Color}, ${that.seled_t_Color});`;
				
				return style;
			},
			style_un_seled() {
				let that = this;
				
				var style = '';
				style = `background-image: linear-gradient(45deg, ${that.un_seled_Color}, ${that.un_seled_t_Color});`;
					
				return style;
			},
		},
		data() {
			return {
				whether: false,
				can_z: '',
				really: '',
				implement: 0,
				surplus: false,
				no_z: '',
				tips:'',
			}
		},
		methods: {
			again(e) {
				if (this.implement == 3 || this.implement == 0) {
					this.whether = false
					this.can_z = this.tips ;
					this.really = ''
					this.implement = 0
					this.surplus = false
					this.no_z = this.tips ;
					let data = {
						
					};
					this.$emit('again', data);
				} else {
					uni.showToast({
						title: '正在执行中...',
						icon: 'none',
						duration: 2000
					})
					return false
				}
			},
			tamin(index) {
				if (this.really == '') {
					this.whether = true
					this.really = index + 1
					this.implement = 1

					setTimeout(res => {
						this.can_z = ''
					}, 500)

					setTimeout(res => {
						//this.can_z = this.result_txt;
						
						let data = {
							result : 1 ,//1成功 0失败
						};
						this.$emit('show', data);
						
						this.surplus = true
						this.implement = 2
					}, 1200)

					setTimeout(res => {
						this.no_z = ''
					}, 1700)

					setTimeout(res => {
						let data = {
							result : 0 ,//1成功 0失败
						};
						this.$emit('show', data);
						//this.no_z = '谢谢惠顾'
						this.implement = 3
					}, 2500)
				}
			}
		}
	}
</script>

<style lang="scss">
	.re-turn {
		width: 40%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 10rpx;
		margin: 30rpx 30%;
		position: relative;
	}

	.box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 10upx 10upx 20upx 10upx;
	}

	.box-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 25upx;
		width: 28%;
		height: 200rpx;
		line-height: 200rpx;
		border-radius: 10rpx;
		position: relative;
		color: #fff;
		margin-left: 0%;
		margin-top: 50rpx;
		text-align: center;
		
	}

	.box-item::before {
		content: "";
		display: block;
		background: inherit;
		filter: blur(10rpx);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 10rpx;
		left: 10rpx;
		z-index: -1;
		opacity: 0.4;
		transform-origin: 0 0;
		border-radius: inherit;
		transform: scale(1, 1);
	}

	.item1 {
		animation: item1 alternate linear 2 1s;
	}

	@keyframes item1 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230rpx;
			left: 230rpx;
		}
	}

	.item2 {
		animation: item2 alternate linear 2 1s;
	}

	@keyframes item2 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230rpx;
			left: 0rpx;
		}
	}

	.item3 {
		animation: item3 alternate linear 2 1s;
	}

	@keyframes item3 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230rpx;
			left: -230rpx;
		}
	}

	.item4 {
		animation: item4 alternate linear 2 1s;
	}

	@keyframes item4 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 0rpx;
			left: 230rpx;
		}
	}

	.item6 {
		animation: item6 alternate linear 2 1s;
	}

	@keyframes item6 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 0rpx;
			left: -230rpx;
		}
	}

	.item7 {
		animation: item7 alternate linear 2 1s;
	}

	@keyframes item7 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230rpx;
			left: 230rpx;
		}
	}

	.item8 {
		animation: item8 alternate linear 2 1s;
	}

	@keyframes item8 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230rpx;
			left: 0rpx;
		}
	}

	.item9 {
		animation: item9 alternate linear 2 1s;
	}

	@keyframes item9 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230rpx;
			left: -230rpx;
		}
	}

	.animt {
		animation: turn 1.2s;
	}

	@keyframes turn {
		0% {
			transform: perspective(150px) rotateY(0deg);
		}

		50% {
			transform: perspective(150px) rotateY(0deg);
		}

		100% {
			transform: perspective(150px) rotateY(179.9deg);
		}
	}
</style>
