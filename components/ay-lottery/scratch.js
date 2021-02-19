class Scratch {
	constructor(page, opts) {
		opts = opts || {}
		this.page = page
		this.canvasId = opts.canvasId || 'canvas'
		this.width = opts.width || 340
		this.height = opts.height + 20 || 150
		this.maskColor = opts.maskColor || '#D2D2D2'
		this.size = opts.size || 10
		this.r = this.size * 2
		this.area = this.r * this.r
		this.scale = opts.scale || 0.3
		this.totalArea = this.width * this.height

		this.init()
	}

	init() {
		this.show = false
		this.clearPoints = []
		this.ctx = uni.createCanvasContext(this.canvasId)
		this.drawMask()
		this.bindTouch()
	}

	drawMask() {
		this.ctx.setFillStyle(this.maskColor)
		this.ctx.fillRect(0, 0, this.width, this.height)
		this.ctx.draw()
	}

	bindTouch() {
		this.page.touchStart = (e) => {
			this.eraser(e, true)
		}
		this.page.touchMove = (e) => {
			this.eraser(e, false)
		}
		this.page.touchEnd = (e) => {
			if (this.show) {
				this.ctx.clearRect(0, 0, this.width, this.height)
				this.ctx.draw()
			}
		}
	}

	eraser(e, bool) {
		const len = this.clearPoints.length
		let count = 0
		const x = e.touches[0].x;
		const y = e.touches[0].y
		const x1 = x - this.size
		const y1 = y - this.size
		if (bool) {
			this.clearPoints.push({
				x1: x1,
				y1: y1,
				x2: x1 + this.r,
				y2: y1 + this.r
			})
		}
		for (const item of this.clearPoints) {
			if (item.x1 > x || item.y1 > y || item.x2 < x || item.y2 < y) {
				count++
			} else {
				break
			}
		}
		if (len === count) {
			this.clearPoints.push({
				x1: x1,
				y1: y1,
				x2: x1 + this.r,
				y2: y1 + this.r
			})
		}
		if (len && this.r * this.r * len > this.scale * this.totalArea) {
			this.show = true
		}
		this.clearArcFun(x, y, this.r, this.ctx)
		this.ctx.draw(true)
	}

	clearArcFun(x, y, r, ctx) {
		let stepClear = 1
		clearArc(x, y, r)

		function clearArc(x, y, radius) {
			const calcWidth = radius - stepClear
			const calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth)

			const posX = x - calcWidth
			const posY = y - calcHeight

			const widthX = 2 * calcWidth
			const heightY = 2 * calcHeight

			if (stepClear <= radius) {
				ctx.clearRect(posX, posY, widthX, heightY)
				stepClear += 1
				clearArc(x, y, radius)
			}
		}
	}
}

export default Scratch
