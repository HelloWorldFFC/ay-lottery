<template>
	<view class="content">

		<aylottery :type="1" themeColor="#33CCCC" btn_Color="#ffffff" seled_Color="#DB7093" seled_t_Color="#98FB98"
		 un_seled_Color="#00BFFF" un_seled_t_Color="#33CCCC" :result_txt="result_turn" @show="show_turn" @again="again_turn"
		 :show_again="true" again_txt="重新开始" :tips_init="tips_init_turn" :no_z_init="no_z_init_turn"></aylottery>
		
		<!-- <aylottery :type="1" themeColor="#33CCCC" btn_Color="#ffffff" seled_Color="#DB7093" seled_t_Color="#98FB98"
		 un_seled_Color="#00BFFF" un_seled_t_Color="#33CCCC" :result_txt="result_turn" @show="show_turn" @again="again_turn"
		 :show_again="true" again_txt="重新开始" :tips_init="tips_init_turn" :no_z_init="no_z_init_turn"
		 seled_img="https://cdn.pixabay.com/photo/2020/05/17/20/34/concept-5183469__340.jpg"
		 un_seled_img="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg"></aylottery> -->

		<aylottery :type="2" :list="list" themeColor="#33CCCC" bgColor="#1E90FF" bg_sd_Color="#4169E1" @result="resultFun"
		 @toDetailPage="toDetailPage"
		 :stay_index="stay_index_m"></aylottery>

		<aylottery :type="2" :list="list" themeColor="#33CCCC" bgColor="#1E90FF" bg_sd_Color="#F4A460" @result="resultFun"
		 @toDetailPage="toDetailPage" theme_img_bg="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg" :is_img_bg="true" box_shadow_Color="#F0F8FF" bg_img="https://cdn.pixabay.com/photo/2018/05/12/03/18/love-3392348__340.jpg"
		 :stay_index="stay_index_m"></aylottery>

		<aylottery :type="3" :list="list_r" :height="600" :width="600" :chance_num_init="chance_num_init" @result="resultFun_chance"
		 @toDetailPage="toDetailPage" :stay_index="stay_index_r"></aylottery>


		<aylottery :type="4" canvasId="canvasId1" :height="200" :width="600" refs="card" style="margin: 20upx 40upx;"
		 @complete="seatShow" :disabled="false" title="刮文本" watermark="刮一刮" @init="init_blow" :is_show="is_show_blow"
		 :result_txt="result_blow" themeColor="#33CCCC" :txtFontSize="txtFontSize_blow" :txtColor="txtColor_blow" :init_show="init_show_blow">
		</aylottery>
		<view class="reset-blow-box" @tap="reset_blow">
			<button style="width: 400upx;" class="cf-bgcolorTheme">重置</button>
		</view>
		
		<aylottery :type="5" canvasId="canvasId2" :height="200" :width="600" refs="card" style="margin: 0 40upx;" @complete="seatShow"
		 :disabled="false" title="刮图片" watermark="刮一刮" @init="init_blow" :is_show="is_show_blow" :result_img="result_img_blow" :init_show="init_show_blow"></aylottery>
		

		<!-- <blowAny  canvasId="canvasId1" :height="200" :width="600" refs="card" style="margin: 0 40upx;"
		  @complete="seatShow" :disabled="false" title="刮文本" watermark="刮一刮" @init="init_blow">
		 	<view class="blow" v-if="is_show_blow" style="height:200rpx;width:600rpx;position: absolute;">
		 		<view class="box" :style="{background: themeColor }">
		 			<view class="result" :style="[{'font-size':txtFontSize_blow+'rpx'},{color: txtColor_blow }]">
		 				<text>{{result_blow}}</text>
		 			</view>
		 
		 		</view>
		 
		 	</view>
		 </blowAny> -->

		<!-- <blowAny  canvasId="canvasId2" :height="200" :width="600" refs="card" style="margin: 0 40upx;" @complete="seatShow"
		  :disabled="false" title="刮图片" watermark="刮一刮" @init="init_blow">
		 	<view style="position: absolute;" v-if="is_show_blow" >
		 	
		 		<view>
		 			<image style="height:200rpx;width:600rpx;"  :src="result_img_blow"></image>
		 		</view>
		 	
		 	</view>
		 	
		 
		 </blowAny> -->


		<aylottery :type="6" canvasId="canvasId3" :height="200" :width="600" refs="card" style="margin: 40upx;" @complete="seatShow"
		 :disabled="false" title="刮自定义" watermark="刮一刮" @init="init_blow" :init_show="init_show_blow">
			<view style="position: absolute;" v-if="is_show_blow">

				<view style="margin: 40upx;">
					自定义内容需自己编写
				</view>

			</view>


		</aylottery>
		
		
	</view>
</template>

<script>
	import aylottery from '@/components/ay-lottery/ay-lottery.vue';
	export default {
		components: {
			aylottery,
		},

		data() {
			return {
				init_show_blow:false ,//刮一刮重置
				result_img_blow: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
				is_show_blow: false, //防止画布画好前闪烁
				themeColor: '#33CCCC',
				txtFontSize_blow: 50,
				txtColor_blow: '#FFFFFF',

				stay_index_m : 1 ,//跑马灯
				stay_index_r_init: 4,
				stay_index_r: 1,
				stay_index_m_init : 4,
				tips_init_turn: '点击',
				no_z_init_turn: '点击',
				result_turn: '',
				result_blow: '谢谢参与',
				chance_num_init: 6,
				list: [{
					img: "https://cdn.pixabay.com/photo/2017/01/21/13/55/nature-1997282__340.jpg",
					name: "不要指望他",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803__340.jpg",
					name: "你在开玩笑么？",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/01/13/23/15/snowboarding-4763731__340.jpg",
					name: "可怕",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {

					img: "https://cdn.pixabay.com/photo/2019/11/30/21/37/stars-4664313__340.jpg",
					name: "可能",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/10/26/snow-6011069__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_640.jpg",
					name: "不用担心",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/24/21/52/grand-canyon-5946657__340.jpg",
					name: "答案就在你身边",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/14/20/32/fish-5917864__340.jpg",
					name: "大胆一点",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/01/03/21/32/field-4739176__340.jpg",
					name: "好运将会降临",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/10/26/snow-6011069__340.jpg",
				}],
				list_r: [{
						index: 0,
						name: '1次机会',
						isAward: true,
						val: 1,
						type: 1,

						img: 'https://cdn.pixabay.com/photo/2020/11/23/15/00/butterfly-5770034__340.jpg',
					},
					{
						index: 1,
						name: '谢谢参与',
						isAward: false,
						type: 0,
						img: 'https://cdn.pixabay.com/photo/2021/01/07/15/02/york-minster-5897525__340.jpg',
					},
					{

						index: 2,
						name: '会特别顺利',
						val: 2,
						isAward: true,
						type: 2,
						img: 'https://cdn.pixabay.com/photo/2021/01/20/21/03/purple-5935577__340.jpg',
					},
					{

						index: 3,
						name: '谢谢参与',
						isAward: false,
						type: 0,
						img: 'https://cdn.pixabay.com/photo/2021/01/13/18/07/tree-5914851__340.jpg',
					},
					{
						index: 4,
						name: '2次机会',
						val: 2,
						isAward: true,
						type: 1,

						img: 'https://cdn.pixabay.com/photo/2021/01/11/18/41/snowfall-5909261__340.jpg',
					},
					{
						index: 5,
						name: '谢谢参与',
						isAward: false,
						type: 0,
						img: 'https://cdn.pixabay.com/photo/2021/01/05/19/55/winter-5892335__340.jpg',
					},
					{

						index: 6,
						name: '4次机会',
						val: 4,
						isAward: true,
						type: 1,

						img: 'https://cdn.pixabay.com/photo/2018/11/11/19/46/christmas-3809544__340.jpg',
					},
					{
						index: 7,
						name: '谢谢参与',
						isAward: false,
						type: 0,
						img: 'https://cdn.pixabay.com/photo/2020/12/15/20/50/christmas-5834904__340.jpg',
					},
					{
						index: 8,
						name: '会付出代价',
						val: 5,
						isAward: true,
						type: 2,
						img: 'https://cdn.pixabay.com/photo/2016/11/14/16/20/snowflake-1823942__340.jpg',
					},
					{
						index: 9,
						name: '谢谢参与',
						isAward: false,
						type: 0,
						img: 'https://cdn.pixabay.com/photo/2020/12/01/16/11/ornaments-5794746__340.jpg',
					},
				],
			}
		},
		onLoad() {
			let that = this;
			that.loadData();

		},
		onShow() {

		},
		onReady: function() {
			let that = this;

			//#ifndef MP-WEIXIN
			setTimeout(function() {
				//that.$refs.blowRef.initBlow()
			}, 50)
			// #endif

		},
		methods: {
			//刮一刮重置
			reset_blow: function() {
				//this.$refs.card.init();
				this.init_show_blow =true ;
				setTimeout(() => {
					this.init_show_blow = false;
				}, 1000)
			},
			//刮一刮
			init_blow() {
				this.is_show_blow = true;
			},
			reset: function() {
				this.$refs.card.init();
			},

			seatShow: function() {

			},
			toDetailPage(e) {
				let list = e.list;
				let idx = e.curIndex;
				let list_img = [];
				let item = e.item;

				list.forEach(item => {
					list_img.push(item.img)
				})
				if (list_img && list_img.length > 0) {
					uni.previewImage({
						current: list_img[idx], //  传 Number H5端出现不兼容
						urls: list_img,
						indicator: "number",
						loop: true,
					});
				}
			},

			again_turn(e) {
				let that = this;
				that.result_turn = '';
				that.no_z_init_turn = that.tips_init_turn;
			},
			show_turn(e) {
				let that = this;
				if (e.result == 1) {

					that.result_turn = that.getShowTxt();
				} else {
					that.no_z_init_turn = '谢谢参与';
				}

			},
			getShowTxt() {
				let that = this;
				//随机获取list的值
				let num = Math.floor(Math.random() * 10); //可均衡获取0到9的随机整数
				let legth = that.list.length || 0;
				let index = num < legth ? num : (legth - 1);
				return that.list[index].name || '哈哈'
			},
			resultFun(e) {
				let that = this;
				let item = e.item;
				let list = e.list;
				
				this.msg_modal("抽中了" + item.name, '恭喜您')
				//定义下一次转的位置
				that.stay_index_m = Math.round(Math.random() * (list.length - 1)); //随机数
				
			},
			resultFun_chance(e) {
				let that = this;

				let item = e.item;
				let index = e.curIndex;
				let list = e.list;

				//定义下一次转的位置
				that.stay_index_r = Math.round(Math.random() * (list.length - 1)); //随机数

				if (e.isAward) {
					this.msg_modal('获得' + (item.name), '恭喜')
					let type = item.type;
					if (type == 1) {
						that.chance_num_init += item.val;
					}
				}
			},
			async loadData() {
				let that = this;

				uni.showLoading({
					title: '加载中',
					mask: true,
				})

				that.result_blow = that.getShowTxt();
				that.result_blow = that.getShowTxt();

				uni.hideLoading();

				//第一次转盘停的位置
				that.stay_index_r = that.stay_index_r_init;
				that.stay_index_m = that.stay_index_m_init;
				
				that.isLoaded = true;

			},
			msg_modal(content, title = '温馨提示') {
				//统一提示方便全局修改
				if (Boolean(content) === false) {
					return;
				}
				uni.showModal({
					title: title,
					content: content,
					confirmText: '确定',
					showCancel: false,
					confirmColor: '#33CCCC',
					success(res) {
						if (res.confirm) {

						}
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	// 刮自定义
	.blow {

		background-size: contain;
		margin: 0rpx auto;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		.box {
			width: 100%;
			height: 100%;
			// background: #aaaa7f;
			border-radius: 10rpx;
			position: relative;
			overflow: hidden;

			.result {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				// font-size: 50rpx;
				// color: #FFFFFF;
			}


		}


	}

	.box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.cf-bgcolorTheme {
		background-color: #33CCCC;
		color: #FFFFFF;
	}
	.reset-blow-box{
		width: 100%;
		text-align: center;
		margin: 50upx auto;
	}
</style>
