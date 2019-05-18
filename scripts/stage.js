import Canvas from './canvas.js'
import Timer from './timer.js'

const MAX_TIME = 99 // mins
const MIN_TIME = 1 // min


class Stage {
  constructor() {
    this.time = 3; // mins
    this.cacheElms()
    this.updateTime()
    this.initElms()
    this.watch()
  }
  initElms() {
    if (!('pictureInPictureEnabled' in document)) {
      this.timeContainer.style.display = 'none'
      this.notSupportedContainer.style.display = 'block'
      return
    }

    this.video.srcObject = this.canvas.stream
  }
  cacheElms() {
    this.timeContainer = document.getElementById('timeContainer')
    this.runningContainer = document.getElementById('running')
    this.notSupportedContainer = document.getElementById('notsupported')
    this.timeDisplay = document.getElementById('time')
    this.upButton = document.getElementById('buttonUp')
    this.downButton = document.getElementById('buttonDown')
    this.startButton = document.getElementById('buttonStart')
    this.canvas = new Canvas(document.getElementById('canvas'))
    this.video = document.getElementById('video')
  }
  watch() {
    this.upButton.addEventListener('click', () => {
      if (this.time >= MAX_TIME) return
      ++this.time
      this.updateTime()
    })
    this.downButton.addEventListener('click', () => {
      if (this.time <= MIN_TIME) return
      --this.time
      this.updateTime()
    })
    this.startButton.addEventListener('click', () => {
      this.video.requestPictureInPicture()
    })
    this.video.addEventListener('enterpictureinpicture', () => {
      this.startTimer()
    })
    this.video.addEventListener('leavepictureinpicture', () => {
      this.stopTick()
    })
  }
  updateTime() {
    const timeStr = this.time.toLocaleString().padStart(2, '0')
    this.timeDisplay.innerHTML = `
     <div>${timeStr}</div>
     <div class="separator">:</div>
     <div>00</div>
     <div class="separator">:</div>
     <div>00</div>
    `
  }
  startTimer() {
    this.timer = new Timer(this.time * 60 * 1000)
    this.timerId = requestAnimationFrame(timestamp => {
      this.tick(timestamp)
    })

    this.timeContainer.style.display = 'none'
    this.runningContainer.style.display = 'block'
  }
  tick(timestamp) {
    if (!this.startMsec) this.startMsec = timestamp
    const result = this.timer.tick(timestamp, this.startMsec)
    this.canvas.paintText(Timer.format(result.remaining))
    if (result.end) {
      this.canvas.paintFinishText("TIME'S UP !!")
      this.stopTick()
      return
    }
    this.timerId = requestAnimationFrame(timestamp => {
      this.tick(timestamp)
    })
  }
  stopTick() {
    cancelAnimationFrame(this.timerId)
    this.startMsec = null
    this.timerId = null
    this.timer = null
    this.timeContainer.style.display = 'flex'
    this.runningContainer.style.display = 'none'
  }
}

export default Stage
