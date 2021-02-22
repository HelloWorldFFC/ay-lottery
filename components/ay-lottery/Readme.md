
## 前言
简介：
1.抽奖效果组件：
	有4个类型：1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（支持H5,小程序暂只能在页面直接写有效果）
2.自定义主题色，和显示内容等，开箱即用

## 有疑问
微信搜索“慢慢向好”小程序，找客服反馈，相应问题。

## 属性说明

|属性	|类型	|说明	|
|--	|--	|--	|
|type	|Number	|1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（文本） 5： 刮一刮（图片），默认1|
|list	|Array	|控制多个时的传值，可控制图片路径，可文字|
|width	|Number	|宽|
|height	|Number	|高|
|themeColor	|String	|主题色|
|seled_Color	|String	|用于翻牌，选中背景渐变色1，默认#f43f3b|
|seled_t_Color	|String	|用于翻牌，选中背景渐变色2，默认#98FB98|
|un_seled_Color	|String	|用于翻牌，未选中背景渐变色1，默认#00BFFF|
|un_seled_t_Color	|String	|用于翻牌，未选中背景渐变色2，默认#33CCCC|
|result_txt	|String	|用于翻牌，翻出文字定义，默认结果|
|show_again	|boolean	|用于翻牌，重新开始按钮是否显示，默认不显示|
|again_txt	|String	|用于翻牌，重新开始按钮文字定义，默认重新开始|
|btn_Color	|String	|用于翻牌，重新开始字体颜色，默认#ffffff|
|tips_init	|String	|用于翻牌，翻牌提示文字定义，默认点击|
|no_z_init	|String	|用于翻牌，未翻出文字定义，默认谢谢参与|
|bgColor	|String	|用于跑马灯，背景色，默认#1E90FF|
|bg_sd_Color	|String	|用于跑马灯，底部背景色，默认#4169E1|
|chance_num_init	|Number	|用于转盘，剩余机会，默认5|
|stay_index	|Number	|用于转盘，停留位置，默认1|
|@result	|function	|用于转盘、跑马灯，完成回调事件	|
|canvasId	|String	|画布id	|
|percentage	|Number	|用于刮一刮，刮开百分之多少的时候开奖	，默认45|
|touchSize	|Number	|用于刮一刮，刮痕的宽度，默认20	|
|fillColor	|String	|用于刮一刮，未刮开图层时的填充色	|
|watermark	|String	|用于刮一刮，水印文字，默认“刮一刮”	|
|watermarkColor	|String	|用于刮一刮，水印文字颜色	|
|watermarkSize	|Number	|用于刮一刮，水印文字大小，默认14	|
|title	|String	|用于刮一刮，标题，默认：刮一刮开奖	|
|titleColor	|String	|用于刮一刮，标题颜色	|
|titleSize	|Number	|用于刮一刮，标题文字大小，默认24	|
|disabled	|boolean	|用于刮一刮，是否禁止刮卡	|
|is_show	|boolean	|用于刮一刮，防止画布画好前闪烁	|
|result_img	|String	|用于刮一刮，刮出图片的路径	|
|result_txt	|String	|用于刮一刮，刮出文字的文字	|
|@complete	|function	|用于刮一刮，刮卡完成回调事件	|
|@init	|function	|用于刮一刮，初始化完成回调事件	|

				  

## 素材
[图片资源](https://pixabay.com)

## 示例项目可直接运行 
## 开始使用
下载源码解压，复制`/components` 下的组件至项目根目录的 `/components` 文件夹下

`index.vue`的`script`加入如下部分（自行选择需要展示的部分）：
```
import aylottery from '@/components/ay-lottery/ay-lottery.vue';
	import blowAny from '@/components/ay-lottery/blow_any.vue';
	export default {
		components: {
			aylottery,
			blowAny,
		},

		data() {
			return {
				result_img_blow: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
				is_show_blow: false, //防止画布画好前闪烁
				themeColor: '#33CCCC',
				txtFontSize_blow: 50,
				txtColor_blow: '#FFFFFF',
				
				
				stay_index_r_init : 4 ,
				stay_index_r : 1,
				tips_init_turn:'点击',
				no_z_init_turn:'点击',
				result_turn:'',
				result_blow:'谢谢参与',
				chance_num_init:6,
				list: [{
				img: "https://cdn.pixabay.com/photo/2017/01/21/13/55/nature-1997282__340.jpg",
				name: "不要指望他"
			}, {
				img: "https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803__340.jpg",
				name: "你在开玩笑么？"
			}, {
				img: "https://cdn.pixabay.com/photo/2020/01/13/23/15/snowboarding-4763731__340.jpg",
				name: "可怕"
			}, {
				
				img: "https://cdn.pixabay.com/photo/2019/11/30/21/37/stars-4664313__340.jpg",
				name: "可能"
			}, {
				img: "https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_640.jpg",
				name: "不用担心"
			}, {
				img: "https://cdn.pixabay.com/photo/2021/01/24/21/52/grand-canyon-5946657__340.jpg",
				name: "答案就在你身边"
			}, {
				img: "https://cdn.pixabay.com/photo/2021/01/14/20/32/fish-5917864__340.jpg",
				name: "大胆一点"
			}, {
				img: "https://cdn.pixabay.com/photo/2020/01/03/21/32/field-4739176__340.jpg",
				name: "好运将会降临"
			}],
				list_r: [{
					index: 0,
					name: '1次机会',
					isAward : true ,
					val : 1 ,
					type: 1,
					
					img: 'https://cdn.pixabay.com/photo/2020/11/23/15/00/butterfly-5770034__340.jpg',
				},
				{
					index: 1,
					name: '谢谢参与',
					isAward : false ,
					type: 0,
					img: 'https://cdn.pixabay.com/photo/2021/01/07/15/02/york-minster-5897525__340.jpg',
				},
				{
					
					index: 2,
					name: '会特别顺利',
					val : 2 ,
					isAward : true ,
					type: 2,
					img: 'https://cdn.pixabay.com/photo/2021/01/20/21/03/purple-5935577__340.jpg',
				},
				{
					
					index: 3,
					name: '谢谢参与',
					isAward : false ,
					type: 0,
					img: 'https://cdn.pixabay.com/photo/2021/01/13/18/07/tree-5914851__340.jpg',
				},
				{
					index: 4,
					name: '2次机会',
					val : 2 ,
					isAward : true ,
					type: 1,
					
					img: 'https://cdn.pixabay.com/photo/2021/01/11/18/41/snowfall-5909261__340.jpg',
				},
				{
					index: 5,
					name: '谢谢参与',
					isAward : false ,
					type: 0,
					img: 'https://cdn.pixabay.com/photo/2021/01/05/19/55/winter-5892335__340.jpg',
				},
				{
					
					index: 6,
					name: '4次机会',
					val : 4 ,
					isAward : true ,
					type: 1,
					
					img: 'https://cdn.pixabay.com/photo/2018/11/11/19/46/christmas-3809544__340.jpg',
				},
				{
					index: 7,
					name: '谢谢参与',
					isAward : false ,
					type: 0,
					img: 'https://cdn.pixabay.com/photo/2020/12/15/20/50/christmas-5834904__340.jpg',
				},
				{
					index: 8,
					name: '会付出代价',
					val : 5 ,
					isAward : true ,
					type: 2,
					img: 'https://cdn.pixabay.com/photo/2016/11/14/16/20/snowflake-1823942__340.jpg',
				},
				{
					index: 9,
					name: '谢谢参与',
					isAward : false ,
					type: 0,
					img: 'https://cdn.pixabay.com/photo/2020/12/01/16/11/ornaments-5794746__340.jpg',
				},],
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
			
			again_turn(e){
				let that = this;
				that.result_turn = '';
				that.no_z_init_turn = that.tips_init_turn;
			},
			show_turn(e){
				let that = this;
				if(e.result==1){
					
					that.result_turn = that.getShowTxt();
				}else{
					that.no_z_init_turn = '谢谢参与';
				}
				
			},
			getShowTxt(){
				let that = this;
				//随机获取list的值
				let num = Math.floor(Math.random()*10);//可均衡获取0到9的随机整数
				let legth = that.list.length || 0 ;
				let index = num<legth ? num : (legth-1) ;
				return that.list[index].name ||'哈哈'
			},
			resultFun(e) {
				let that = this;
				let item = e.item;
				this.msg_modal("抽中了" + item.name,'恭喜您')

			},
			resultFun_chance(e){
				let that = this;
				
				let item = e.item;
				let index = e.curIndex ;
				let list = e.list;
				
				//定义下一次转的位置
				that.stay_index_r = Math.round(Math.random() * (list.length - 1)); //随机数
				
				if(e.isAward){
					this.msg_modal('获得' + (item.name),'恭喜')
					let type = item.type ;
					if(type==1){
						that.chance_num_init += item.val ;
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
				that.stay_index_r = that.stay_index_r_init ;
				
				that.isLoaded = true;

			},
			msg_modal(content,title='温馨提示'){
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


```


`index.vue`的`template`加入如下部分：（自行打开注释选择需要展示的部分）
```
<view class="content">
		
		<aylottery :type="1" themeColor="#33CCCC" btn_Color="#ffffff" seled_Color="#DB7093" seled_t_Color="#98FB98" un_seled_Color="#00BFFF"
		 un_seled_t_Color="#33CCCC" :result_txt="result_turn" @show="show_turn" @again="again_turn" :show_again="true" again_txt="重新开始" :tips_init="tips_init_turn" :no_z_init="no_z_init_turn"></aylottery>
		
		
		<aylottery :type="2" :list="list" themeColor="#33CCCC" bgColor="#1E90FF" bg_sd_Color="#4169E1" @result="resultFun" @toDetailPage="toDetailPage"></aylottery>
		
		<aylottery :type="3" :list="list_r" :height="600" :width="600" :chance_num_init="chance_num_init" @result="resultFun_chance" @toDetailPage="toDetailPage" :stay_index="stay_index_r"></aylottery>
		
		
		<!-- <aylottery :type="4" canvasId="canvasId1" :height="200" :width="600" refs="card" style="position: relative;margin: 20upx 40upx;"
		 @complete="seatShow" :disabled="false" title="刮文本" watermark="刮一刮" @init="init_blow" :is_show="is_show_blow" :result_txt="result_blow" themeColor="#33CCCC" :txtFontSize="txtFontSize_blow" :txtColor="txtColor_blow">
		</aylottery> -->
		
		<!-- <aylottery :type="5" canvasId="canvasId2" :height="200" :width="600" refs="card" style="position: relative;margin: 0 40upx;" @complete="seatShow"
		 :disabled="false" title="刮图片" watermark="刮一刮" @init="init_blow" :is_show="is_show_blow" :result_img="result_img_blow"></aylottery> -->
		
		
		 <!-- <blowAny  canvasId="canvasId1" :height="200" :width="600" refs="card" style="position: relative;margin: 0 40upx;"
		  @complete="seatShow" :disabled="false" title="刮文本" watermark="刮一刮" @init="init_blow">
		 	<view class="blow" v-if="is_show_blow" style="height:200rpx;width:600rpx;position: absolute;">
		 		<view class="box" :style="{background: themeColor }">
		 			<view class="result" :style="[{'font-size':txtFontSize_blow+'rpx'},{color: txtColor_blow }]">
		 				<text>{{result_blow}}</text>
		 			</view>
		 
		 		</view>
		 
		 	</view>
		 </blowAny> -->
		 
		 <!-- <blowAny  canvasId="canvasId1" :height="200" :width="600" refs="card" style="position: relative;margin: 0 40upx;" @complete="seatShow"
		  :disabled="false" title="刮图片" watermark="刮一刮" @init="init_blow">
		 	<view style="position: absolute;" v-if="is_show_blow" >
		 	
		 		<view>
		 			<image style="height:200rpx;width:600rpx;"  :src="result_img_blow"></image>
		 		</view>
		 	
		 	</view>
		 	
		 
		 </blowAny> -->
		 
		
		<!-- <blowAny  canvasId="canvasId1" :height="200" :width="600" refs="card" style="position: relative;margin: 0 40upx;" @complete="seatShow"
		 :disabled="false" title="刮自定义" watermark="刮一刮" @init="init_blow">
			<view style="position: absolute;" v-if="is_show_blow" >
				
				<view>
					自定义内容需自己编写
				</view>
			
			</view>
			
		
		</blowAny> -->
		
	</view>

```
 

## 参考
[参考链接1](https://blog.csdn.net/qq_43764578/article/details/106329612)
[参考链接2](https://www.baidu.com/link?url=Vudt-1kEqZqAXnDyaw67FKE6qdANdkWOVl8OS9VSbezcql181qVYSar7PUdMPrzzM45XZnI4xF1deeIFbXMfTa&wd=&eqid=db15fd820008c60f000000065fafac6f)
[参考链接3](https://ext.dcloud.net.cn/plugin?id=1890)
[参考链接4](https://blog.csdn.net/qq_40101922/article/details/102463778)
[参考链接5](https://ext.dcloud.net.cn/plugin?id=3685)
[参考链接6](https://ext.dcloud.net.cn/plugin?id=2481)
