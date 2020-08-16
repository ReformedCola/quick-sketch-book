let canvas = document.getElementById('canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d')


let lineWidth = 8
let thin = document.getElementById('thin')
let thick = document.getElementById('thick')

let clear = document.getElementById('clear')
let save = document.getElementById('save')

let painting = false
let last = []

ctx.fillStyle = 'black'
ctx.strokeStyle = 'none'
ctx.lineCap = 'round'

let isTouchDevice = 'ontouchstart' in document.documentElement
console.log(isTouchDevice)

if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0], last[1], x, y)
    last = [x, y]
  }
} else {
  canvas.onmousedown = (e) => {
    painting = true
    last = [e.clientX, e.clientY]
  }

  canvas.onmousemove = (e) => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }

  canvas.onmouseup = () => {
    painting = false
  }
}

function sizeSwitcher() {
  thin.onclick = function () {
    lineWidth = 3
    thick.classList.remove('active')
    thin.classList.add('active')
  }
  thick.onclick = function () {
    lineWidth = 8
    thin.classList.remove('active')
    thick.classList.add('active')
  }
}

function clearAll() {
  clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

function saveImage() {
  save.onclick = function () {
    let url = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'Result'
    a.target = '_blank'
    a.click()
  }
}

clearAll()

saveImage()

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lineWidth
  console.log(lineWidth)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

sizeSwitcher()