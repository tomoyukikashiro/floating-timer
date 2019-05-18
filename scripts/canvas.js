class Canvas {
  constructor(canvas) {
    this.textHeight = 30;
    this.elm = canvas
    this.ctx = canvas.getContext('2d')
    this.init()
  }
  init() {
    this.ctx.font = '50px sans-serif'
    this.ctx.textAlign = 'center'
    this.clearRect()
  }
  clearRect (color) {
    color = color || '#005af0'
    this.ctx.clearRect(0, 0, this.elm.width, this.elm.height)
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.elm.width, this.elm.height);
  }
  paintText(text, bgColor) {
    this.clearRect(bgColor)
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(text, this.elm.width / 2, (this.elm.height + this.textHeight) / 2)
  }
  paintFinishText(text) {
    this.paintText(text, '#e74c3c')
  }
  get stream() {
    return this.elm.captureStream(60);
  }
}
export default Canvas
