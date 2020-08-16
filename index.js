let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let eraser = document.getElementById('eraser')
let pencil = document.getElementById('pencil')
let black = document.getElementById('black')
let red = document.getElementById('red')
let green = document.getElementById('green')
let blue = document.getElementById('blue')
let colors = document.querySelectorAll('ol.colors > li')
let thin = document.getElementById('thin')
let thick = document.getElementById('thick')
let clear = document.getElementById('clear')
let save = document.getElementById('save')

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

ctx.fillStyle = 'black'
ctx.strokeStyle = 'none'
ctx.lineCap = 'round'

let lineWidth = 8
let painting = false
let isEraser = false
let lastPos = {
  x: undefined,
  y: undefined
}

mouseOrTouch(canvas, ctx)

pencilOrEraser(pencil, eraser)

colorSwitcher()

sizeSwitcher()

clearAll()

saveImage()

function mouseOrTouch(canvas, ctx) {
  let isTouchDevice = 'ontouchstart' in document.documentElement
  if (isTouchDevice) {
    touchDraw(canvas, ctx)
  } else {
    mouseDraw(canvas, ctx)
  }
}

function mouseDraw(canvas, ctx) {
  console.log(canvas)
  canvas.onmousedown = (e) => {
    let x = e.clientX
    let y = e.clientY
    painting = true
    if (isEraser) {
      ctx.clearRect(x, y, 10, 10)
    } else {
      lastPos = {x, y}
    }
  }

  canvas.onmousemove = (e) => {
    if (!painting) {
      return
    }
    let x = e.clientX
    let y = e.clientY
    if (isEraser) {
      ctx.clearRect(x - 5, y - 5, 20, 20)
    } else {
      drawLine(lastPos.x, lastPos.y, x, y)
      lastPos = {x, y}
    }
  }

  canvas.onmouseup = () => {
    painting = false
  }
}

function touchDraw(canvas, ctx) {
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if (isEraser) {
      ctx.clearRect(x, y, 10, 10)
    } else {
      lastPos = {x, y}
    }
  }
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if (isEraser) {
      ctx.clearRect(x - 5, y - 5, 20, 20)
    } else {
      drawLine(lastPos.x, lastPos.y, x, y)
      lastPos = {x, y}
    }
  }
}

function pencilOrEraser(pencil, eraser) {
  pencil.onclick = function () {
    isEraser = false
    eraser.classList.remove('active')
    pencil.classList.add('active')
  }
  eraser.onclick = function () {
    isEraser = true
    pencil.classList.remove('active')
    eraser.classList.add('active')
  }
}

function changeColor(colorName, colorLi) {
  ctx.fillStyle = colorName
  ctx.strokeStyle = colorName
  colors.forEach((color) => {
    color.classList.remove('active')
  })
  colorLi.classList.add('active')
}


function colorSwitcher() {
  black.onclick = function () {
    changeColor('black', black)
  }
  red.onclick = function () {
    changeColor('red', red)
  }
  green.onclick = function () {
    changeColor('green', green)
  }
  blue.onclick = function () {
    changeColor('blue', blue)
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

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
