let canvas = document.getElementById('canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d')


let lineWidth = 8
let black = document.getElementById('black')
let red = document.getElementById('red')
let green = document.getElementById('green')
let blue = document.getElementById('blue')
let colors = document.querySelectorAll('ol.colors > li')
let thin = document.getElementById('thin')
let thick = document.getElementById('thick')
let clear = document.getElementById('clear')
let save = document.getElementById('save')

let painting = false
let last = []

ctx.fillStyle = 'black'
ctx.strokeStyle = 'none'
ctx.lineCap = 'round'

mouseOrTouch(canvas)

function colorSwitcher() {
  black.onclick = function () {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    colors.forEach((color) => {
      color.classList.remove('active')
    })
    black.classList.add('active')
  }
  red.onclick = function () {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    colors.forEach((color) => {
      color.classList.remove('active')
    })
    red.classList.add('active')
  }
  green.onclick = function () {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    colors.forEach((color) => {
      color.classList.remove('active')
    })
    green.classList.add('active')
  }
  blue.onclick = function () {
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    colors.forEach((color) => {
      color.classList.remove('active')
    })
    blue.classList.add('active')
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



sizeSwitcher()

colorSwitcher()

function mouseOrTouch(canvas) {
  let isTouchDevice = 'ontouchstart' in document.documentElement
  if (isTouchDevice) {
    touchDraw(canvas)
  } else {
    mouseDraw(canvas)
  }
}




function mouseDraw(canvas) {
  console.log(canvas)
  canvas.onmousedown = (e) => {
    let x = e.clientX
    let y = e.clientY
    painting = true
    last = [x, y]
  }

  canvas.onmousemove = (e) => {
    let x = e.clientX
    let y = e.clientY
    if (painting === true) {
      drawLine(last[0], last[1], x, y)
      last = [x, y]
    }
  }

  canvas.onmouseup = () => {
    painting = false
  }
}

function touchDraw(canvas) {
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
}

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lineWidth
  console.log(lineWidth)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}