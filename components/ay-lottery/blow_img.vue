<template>
	<view >
		<view  :id="canvasId" class="box">
			<view  :style="{width: width+'rpx', height : height+'rpx'}" >
				<view style="position: absolute;" v-if="is_show">
				
					<view>
						<image :style="{width: width+'rpx', height : height+'rpx'}"  :src="result_img"></image>
					</view>
				
				</view>
				<canvas style="position: absolute;" :style="{width: width+'rpx', height : height+'rpx'}" :disable-scroll="true" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" :canvas-id="canvasId"></canvas>
			</view>
			
		</view>
	</view>
</template>

<script>
	let ctx = null ;
	export default {
		props:{
			is_show: { //防止画布画好前闪烁
				type: Boolean,
				default: false
			},
			result_img: {
				type: String,
				default: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
			},
			canvasId: {
				type: String,
				default: 'blow',
			},
			height: {
				type: Number,
				default: 200
			},
			width: {
				type: Number,
				default: 300
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
			
		},
		data() {
			return {
				
				startX : null ,
				startY : null ,
				computing : false ,
				complete : false ,
				reset : false ,
				ready : false ,
				storePoints:[]
			};
		},
		mounted() {
			ctx = uni.createCanvasContext(this.canvasId , this) ;
			this.initBlow();
		},
		methods:{
			
			
			
			initBlow : function(){
				this.computing = false ;
				this.complete = false ;
				this.reset = false ;
				this.ready = false ;
				ctx.clearRect(0,0,this.width,this.height);
				//绘制画布
				ctx.setFillStyle(this.fillColor);
				ctx.fillRect(0, 0, this.width , this.height );
				this.ready = true ;
				//绘制文字水印
				this.fillWatermark();
				//绘制标题
				this.fillTitle();
				ctx.draw();
				
				setTimeout(res => {
					let data = {
						
					};
					this.$emit('init', data);
				}, 50)
				
			},
			
			/**
			 * 绘制文字水印
			 */
			fillWatermark : function(e){
				if (!this.watermark) {
					return ;
				}
				var width = this.watermark.length * this.watermarkSize ;
				ctx.save() ;
				ctx.rotate(-10 * Math.PI / 180);
				let x = 0 ; 
				let y = 0 ;
				let i = 0 ;
				while( (x <= this.width * 5 || y <= this.height*5) && i < 300){
					ctx.setFillStyle(this.watermarkColor);
					ctx.setFontSize(this.watermarkSize);
					ctx.fillText(this.watermark,  x  , y );
					x += width + width * 1.6 ;
					if (x > this.width && y <= this.height ) {
						x = -Math.random()*100 ;
						y += this.watermarkSize * 3 ;
					}
					i++ ;
				}
				ctx.restore();
			},
			
			/**
			 * 绘制标题
			 */
			fillTitle : function(e){
				if (!this.title) {
					return ;
				}
				ctx.setTextAlign("center");
				ctx.setTextBaseline("middle");
				ctx.setFillStyle(this.titleColor);
				ctx.setFontSize(this.titleSize);
				ctx.fillText(this.title,  this.width/2/2  , this.height/2/2 );//因单位是rpx故再除以2
			},
			
			touchstart : function(e){
				if (this.disabled) {
					return ;
				}
				this.startX = e.touches[0].x;
				this.startY = e.touches[0].y;
			},
			
			touchend : function(e){
				this.getFilledPercentage();
			},
			
			touchmove : function(e){
				if(this.complete || this.disabled ){
					return ;
				}
				// ctx.globalCompositeOperation = 'destination-out'; 
				ctx.moveTo(this.startX , this.startY );
				// ctx.beginPath();
				// ctx.arc(this.startX, this.startY, 20, 0, Math.PI * 20);
				// ctx.fill();
				ctx.clearRect( this.startX , this.startY , this.touchSize , this.touchSize ) ;
				ctx.draw(true);
				//记录移动点位
				this.startX = e.touches[0].x;
				this.startY = e.touches[0].y;
			},
			
			getFilledPercentage:function(e){
				if (this.computing) {
					return ;
				}
				this.computing = true ;
				uni.canvasGetImageData({
					canvasId: this.canvasId ,
					x: 0,
					y: 0,
					width: this.width ,
					height: this.height ,
					success: (res) => {
						let pixels = res.data;
						let transPixels = [];
						for (let i = 0; i < pixels.length; i += 4) {
							if (pixels[i + 3] < 128) {
								transPixels.push(pixels[i + 3]);
							}
						}
						var percent = (transPixels.length / (pixels.length / 2) * 100).toFixed(2);
						if( percent >= this.percentage ){						
							this.success();
						}
						this.computing = false ;
						console.log(percent)
					},
					fail : function(e){
						console.log(e);
					},
				}, this);
			},
			
			success : function(e){
				this.complete = true ;
				if (this.reset) {
					return ;
				}
				this.reset = true ;
				ctx.moveTo(0, 0);
				ctx.clearRect(0,0, this.width, this.height);
				ctx.stroke() ;
				ctx.draw(true);
				this.$emit("complete",{});
			},
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
