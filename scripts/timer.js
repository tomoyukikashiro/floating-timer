const pad = (number) => {
  const numStr = Math.round(number).toString().padStart(2, '0')
  return numStr.substring(0, 2)
}

class Timer {
  /**
   * format msec to mm:ss
   * @param msec
   */
  static format(msec) {
    const m = Math.floor(msec / 1000 / 60)
    const s = Math.floor(msec / 1000) - (m * 60)
    const ms = msec - (m * 1000 * 60) - (s * 1000)
    return `${pad(m)} : ${pad(s)} : ${pad(ms)}`
  }
  constructor(goal) {
    this.pausing = 0;
    this.pauseStart = null;
    this.goal = goal
  }
  tick(timestamp, start) {
    if (this.pauseStart) {
      this.pausing += Date.now() - this.pauseStart
      this.pauseStart = null
    }
    const remaining = this.goal - (timestamp - start) + this.pausing
    const end = remaining <= 0
    return { remaining: end ? 0 : remaining, end: remaining <= 0 }
  }
  pause() {
    this.pauseStart = Date.now()
  }
}
export default Timer
