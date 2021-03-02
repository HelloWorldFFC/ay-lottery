<template>
	<view>
		<turnLottery v-if="type==1" 
		:themeColor="themeColor" 
		:btn_Color="btn_Color" 
		:seled_Color="seled_Color" 
		:seled_t_Color="seled_t_Color" 
		:un_seled_Color="un_seled_Color"
		:un_seled_t_Color="un_seled_t_Color"
		:show_again="show_again"
		:again_txt="again_txt"
		:result_txt="result_txt"
		:tips_init="tips_init"
		:no_z_init="no_z_init"
		@show="show" 
		@again="again" ></turnLottery>
		
		
		<marquee v-if="type==2" :list="list" :themeColor="themeColor" :bgColor="bgColor" :bg_sd_Color="bg_sd_Color" @result="result" @toDetailPage="toDetailPage"
		:theme_img_bg="theme_img_bg" 
		:is_img_bg="is_img_bg"
		:box_shadow_Color="box_shadow_Color"
		:bg_img="bg_img"></marquee>
		
		<turnplate v-if="type==3" :list="list" :chance_num_init="chance_num_init" :height="height" :width="width" @result="result" @toDetailPage="toDetailPage" :stay_index="stay_index"></turnplate>
		
		<blow v-if="type==4"  
		ref="blowRef"
		:canvasId="canvasId" 
		:height="height" 
		:width="width" 
		:percentage="percentage" 
		:touchSize="touchSize"
		:fillColor="fillColor"
		:watermark="watermark"
		:watermarkColor="watermarkColor"
		:watermarkSize="watermarkSize"
		:title="title"
		:titleColor="titleColor"
		:titleSize="titleSize"
		:disabled="disabled"
		
		:is_show="is_show"
		:result_img="result_img"
		:result_txt="result_txt"
		:txtFontSize="txtFontSize" 
		:txtColor="txtColor"
		@complete="complete"
		@init="init"></blow>
		
		<blowImg v-if="type==5"
		ref="blowRef"
		:canvasId="canvasId" 
		:height="height" 
		:width="width" 
		:percentage="percentage" 
		:touchSize="touchSize"
		:fillColor="fillColor"
		:watermark="watermark"
		:watermarkColor="watermarkColor"
		:watermarkSize="watermarkSize"
		:title="title"
		:titleColor="titleColor"
		:titleSize="titleSize"
		:disabled="disabled"
		
		:is_show="is_show"
		:result_img="result_img"
		:result_txt="result_txt"
		:txtFontSize="txtFontSize" 
		:txtColor="txtColor"
		@complete="complete"
		@init="init"></blowImg>
	</view>
</template>

<script>
	import marquee from './marquee.vue';
	import turnplate from './turnplate.vue';
	import turnLottery from './turnLottery.vue';
	import blow from './blow.vue';
	import blowImg from './blow_img.vue';
	export default {
		components: {
			marquee,
			turnplate,
			turnLottery,
			blow,
			blowImg,
		},
		props: {
			type: {
				type: Number,
				default: 1, //1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（文本） 5： 刮一刮（图片）
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			
			height: {
				type: Number,
				default: 150
			},
			width: {
				type: Number,
				default: 150
			},
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
				default: '中奖结果',
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
			bgColor: {
				type: String,
				default: '#1E90FF',
			},
			bg_sd_Color: {
				type: String,
				default: '#4169E1',
			},
			
			chance_num_init :{
				type: Number,
				default: 5
			},
			height: {
				type: Number,
				default: 700
			},
			width: {
				type: Number,
				default: 700
			},
			txtColor: {
				type: String,
				default: '#FFFFFF',
			},
			txtFontSize: {
				type: Number,
				default: 50,
			},
			canvasId: {
				type: String,
				default: 'blow',
			},
			//停留位置
			stay_index :{
				type: Number,
				default: 1
			},
			percentage : { //刮开百分之多少的时候开奖
				type : Number ,
				default : 45 
			},
			touchSize : { //触摸画笔大小
				type : Number ,
				default : 20 
			},
			fillColor : { //未刮开图层时的填充色
				type : String ,
				default : '#ddd' 
			},
			watermark : { //水印文字
				type : String ,
				default : '刮一刮' 
			},
			watermarkColor : { //水印文字颜色
				type : String ,
				default : '#c5c5c5' 
			},
			watermarkSize : { //水印文字大小
				type : Number ,
				default : 14 
			},
			title : { //提示文字
				type : String ,
				default : '刮一刮开奖' 
			},
			titleColor : { //提示文字颜色
				type : String ,
				default : '#888' 
			},
			titleSize : { //提示文字大小
				type : Number ,
				default : 24 
			},
			disabled : { //是否禁止刮卡
				type : Boolean ,
				default : false 
			},
			
			is_show : { //防止画布画好前闪烁
				type : Boolean ,
				default : false 
			},
			result_img: {
				type: String,
				default: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
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
		},
		computed: {


		},

		watch: {

		},
		data() {
			return {

			};
		},

		methods: {
			initBlow(){
				this.$refs.blowRef.initBlow()
			},
			show(e){
				this.$emit('show', e);
			},
			again(e){
				this.$emit('again', e);
			},
			result(e){
				this.$emit('result', e);
			},
			toDetailPage(e){
				this.$emit('toDetailPage', e);
			},
			complete(e){
				this.$emit('complete', e);
			},
			init(e){
				this.$emit('init', e);
			},
		},
	}
</script>

<style lang="scss">

</style>
