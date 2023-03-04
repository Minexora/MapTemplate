class PlayerClass {
  // eslint-disable-next-line no-useless-constructor
  __container = null
  __timeLine = null
  __maxValue = null
  __timeLineHeight = null
  __items = []
  __isPlay = false
  __currentPoint = 0
  __interval = null
  __progressUpDownCount = 5
  __playbackSpeed = 1000
  __multiplier = 1
  __showFunc = null
  __funcSelf = null
  __currentDistance = null
  __multipliers = {
    '-5X': 5000,
    '-4X': 4000,
    '-3X': 3000,
    '-2X': 2000,
    '1X': 1000,
    '2X': 500,
    '3X': 333,
    '4X': 250,
    '5X': 200
  }

  constructor ({ max, timeLineHeight = 20, progressUpDownCount = 5, currentDistance = 0, playbackSpeed = 1000, showFunc = null, funcSelf = null }) {
    this.__maxValue = max
    this.__timeLineHeight = timeLineHeight
    this.__items = []
    this.__isPlay = false
    this.__progressUpDownCount = progressUpDownCount
    this.__playbackSpeed = playbackSpeed
    this.__showFunc = showFunc
    this.__funcSelf = funcSelf
    this.__currentDistance = currentDistance
    console.log(currentDistance)

    // History Tracking Container
    const container = document.querySelector('#historyTracking')
    this.__container = container
    // Timeline
    const timeLine = document.createElement('div')
    timeLine.className += 'time_line'
    timeLine.style.height = this.__timeLineHeight + 20 + 'px'
    container.appendChild(timeLine)
    this.__timeLine = timeLine

    // Controls
    const controls = document.createElement('div')
    controls.className += 'controls'

    // Playback Speed Decrease
    const speedDecreaseIcon = document.createElement('img')
    speedDecreaseIcon.src = require('../images/rewind-button.png')
    speedDecreaseIcon.className = 'icon'
    speedDecreaseIcon.addEventListener('click', () => this.onPlaybackSpeedDecrease(this))
    controls.appendChild(speedDecreaseIcon)

    // Back Icon
    const backIcon = document.createElement('img')
    backIcon.src = require('../images/left-arrow.png')
    backIcon.className = 'icon'
    backIcon.addEventListener('click', () => this.onRewind(this))
    controls.appendChild(backIcon)

    // Play Pause icon
    const playPauseIcon = document.createElement('img')
    playPauseIcon.src = require('../images/player-button.png')
    playPauseIcon.addEventListener('click', () => this.onSetFuction({ self: this, event: true }))
    playPauseIcon.className = 'icon play_pause'
    controls.appendChild(playPauseIcon)

    // Forward Icon
    const forwardIcon = document.createElement('img')
    forwardIcon.src = require('../images/right-arrow.png')
    forwardIcon.className = 'icon'
    forwardIcon.addEventListener('click', () => this.onFastForward(this))
    controls.appendChild(forwardIcon)

    // Playback Speed Increase
    const speedIncreaseIcon = document.createElement('img')
    speedIncreaseIcon.src = require('../images/fast-forward-button.png')
    speedIncreaseIcon.className = 'icon'
    speedIncreaseIcon.addEventListener('click', () => this.onPlaybackSpeedIncrease(this))
    controls.appendChild(speedIncreaseIcon)

    // Reset Icon
    const rebootIcon = document.createElement('img')
    rebootIcon.src = require('../images/reboot.png')
    rebootIcon.className = 'icon'
    rebootIcon.addEventListener('click', () => this.onReset(this))
    controls.appendChild(rebootIcon)

    // Date Time
    const dateTimeDiv = document.createElement('div')
    dateTimeDiv.className = 'descriptions'
    dateTimeDiv.innerHTML = `<div class='title'>Date:</div><div class='value date'>${this.__currentDate}</div>`
    controls.appendChild(dateTimeDiv)

    // Current Distance Time
    const distanceDiv = document.createElement('div')
    distanceDiv.className = 'descriptions'
    distanceDiv.innerHTML = `<div class='title'>Dist:</div><div class='value dist'>${this.__currentDate}</div>`
    controls.appendChild(distanceDiv)

    // Speed Time
    const speedDiv = document.createElement('div')
    speedDiv.className = 'descriptions'
    speedDiv.innerHTML = `<div class='title'>Speed:</div><div class='value speed'>${this.__currentSpeed}</div>`
    controls.appendChild(speedDiv)

    // Total Disctance Time
    const totalDistanceDiv = document.createElement('div')
    totalDistanceDiv.className = 'descriptions'
    totalDistanceDiv.innerHTML = `<div class='title'>T.Dist:</div><div class='value t_dist'>${this.__distance}</div>`
    controls.appendChild(totalDistanceDiv)

    container.appendChild(controls)
    this.setControlData({ speed: 0, dist: 0, date: '2023-03-03T00:00:26', tDist: Math.round(currentDistance) })
  }

  createTimeItem ({ id, obj = {}, current = 0, warning = false, danger = false, onClick = null }) {
    this.__items.push(typeof obj === 'object' ? { ...obj } : obj)
    const itemBottomSize = (((current / this.__maxValue) * 100) * this.__timeLineHeight) / 100

    // Time items
    const timeItem = document.createElement('div')
    timeItem.className = 'time_item'
    timeItem.id = `item_${id}`
    timeItem.style.height = this.__timeLineHeight + 'px'
    const self = this
    timeItem.addEventListener('click', function () {
      if (onClick) onClick(self.__items[this.id.split('_')[1]])
      self.__currentPoint = this.id.split('_')[1]
    })

    // Time Item Top
    const timeItemTop = document.createElement('div')
    timeItemTop.className = 'time_line_top'
    timeItemTop.style.height = (this.__timeLineHeight - itemBottomSize) + 'px'
    timeItem.appendChild(timeItemTop)

    // Time Item Bottom
    const timeItemBottom = document.createElement('div')
    timeItemBottom.className = 'time_line_bottom'
    if (warning) timeItemBottom.className += ' warning'
    if (danger) timeItemBottom.className += ' danger'
    timeItemBottom.style.height = itemBottomSize + 'px'
    timeItem.appendChild(timeItemBottom)

    this.__timeLine.appendChild(timeItem)
  }

  onSetFuction ({ self, event = false }) {
    const playPauseBtn = document.querySelector('.controls .play_pause')
    this.__isPlay = !this.__isPlay
    // self.__items.sort((a, b) => a.entryDate - b.entryDate)
    if (!this.__isPlay) {
      playPauseBtn.src = require('../images/player-button.png')
      if (event) self.onPause()
    } else {
      playPauseBtn.src = require('../images/pause-button.png')
      if (event) self.onStart()
    }
  }

  runProcess (self) {
    if (self.__currentPoint >= self.__items.length) {
      self.onReset()
    }
    self.onShowPoint()
    self.__currentPoint++
  }

  onStart () {
    const self = this
    self.__interval = setInterval(() => self.runProcess(self), self.__playbackSpeed)
  }

  onReset () {
    clearInterval(this.__interval)
    this.__currentPoint = 0
    this.__playbackSpeed = 1000
    this.__isPlay = true
    this.__multiplier = 1
    this.onSetFuction({ self: this, event: false })
    this.onShowPoint()
  }

  onPause () {
    clearInterval(this.__interval)
  }

  findSpeed (type) {
    while (this.__multiplier > -5 && this.__multiplier < 5 && !(`${this.__multiplier}X` in this.__multipliers)) {
      if (type === 'dec') this.__multiplier -= 1
      else if (type === 'inc') this.__multiplier += 1
    }
    return this.__multipliers[`${this.__multiplier}X`]
  }

  setControlData ({ speed, dist, date, tDist }) {
    const speedDiv = document.querySelector('.player_container .controls .descriptions .speed')
    speedDiv.innerText = speed

    const distDiv = document.querySelector('.player_container .controls .descriptions .dist')
    distDiv.innerText = dist + 'KM'

    const dateDiv = document.querySelector('.player_container .controls .descriptions .date')
    dateDiv.innerText = date.split('T').join(' ')

    const tDistDiv = document.querySelector('.player_container .controls .descriptions .t_dist')
    tDistDiv.innerText = tDist + 'KM'
  }

  onPlaybackSpeedDecrease (self) {
    if (self.__multiplier > -5) self.__multiplier -= 1
    self.__playbackSpeed = `${self.__multiplier}X` in self.__multipliers ? self.__multipliers[`${self.__multiplier}X`] : self.findSpeed('dec')
    if (this.__isPlay) {
      clearInterval(this.__interval)
      self.__interval = setInterval(() => self.runProcess(self), self.__playbackSpeed)
    }
  }

  onRewind (self) {
    self.__currentPoint -= self.__progressUpDownCount
  }

  onFastForward (self) {
    self.__currentPoint += self.__progressUpDownCount
  }

  onPlaybackSpeedIncrease (self) {
    if (self.__multiplier < 5) self.__multiplier += 1
    self.__playbackSpeed = self.__playbackSpeed = `${self.__multiplier}X` in self.__multipliers ? self.__multipliers[`${self.__multiplier}X`] : self.findSpeed('inc')
    if (this.__isPlay) {
      clearInterval(this.__interval)
      self.__interval = setInterval(() => self.runProcess(self), self.__playbackSpeed)
    }
  }

  onShowPoint () {
    const beforeActiveDiv = this.__timeLine.querySelector('div.time_item.active')
    if (beforeActiveDiv) beforeActiveDiv.classList.remove('active')
    const activeDiv = this.__timeLine.querySelector(`div.time_item#item_${this.__currentPoint}`)
    activeDiv.className += ' active'
    this.setControlData({ date: this.__items[this.__currentPoint].entryDate, speed: Math.round(this.__items[this.__currentPoint].speed), dist: Math.round(this.__items[this.__currentPoint].distance), tDist: Math.round(this.__currentDistance) })
    this.__showFunc(this.__funcSelf, this.__items.slice(0, this.__currentPoint === 0 ? 1 : this.__currentPoint))
  }
}

export const Player = PlayerClass
