var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

var circleArray = new Array()
var colorArray = ["#6DD9BF", "#50A18E", "#F2D680", "#F2916D", "#F26E50"]
var radius = 5
var maxRadius = 40
var speed = 1

var Mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", function(e){
    Mouse.x = e.clientX
    Mouse.y = e.clientY
})

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

function Circle(x, y, radius, speedX, speedY, color){
    this.x = x
    this.y = y
    this.radius = radius
    this.speedX = speedX
    this.speedY = speedY
    this.color = color
}

Circle.prototype.draw = function(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
}

Circle.prototype.move = function(){
    if(this.x <= radius || this.x >= canvas.width - radius)
        this.speedX = -this.speedX
    if(this.y <= radius || this.y >= canvas.height - radius)
        this.speedY = -this.speedY

    this.x += this.speedX
    this.y += this.speedY

    this.changeSize()
}

Circle.prototype.changeSize = function(){
    if(Mouse.x - this.x < 50 && Mouse.x - this.x > -50 && Mouse.y - this.y < 50 && Mouse.y - this.y > -50){
        if(this.radius <= maxRadius)
            this.radius++
    }else if(this.radius > radius)
        this.radius--
}

function init(){
    for(let i = 0; i < 800; i++){
        let circleX
        let circleY 
        do{
            circleX = Math.floor(Math.random()*canvas.width)
            circleY = Math.floor(Math.random()*canvas.height)
        }while(!(circleX > radius && circleX < canvas.width - radius && circleY > radius && circleY < canvas.height - radius))
        circleArray[i] = new Circle (circleX, circleY, radius, speed * [1,-1][Math.floor(Math.random() * 2)], speed * [1,-1][Math.floor(Math.random() * 2)], colorArray[Math.floor(Math.random()*colorArray.length)])
    }
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].draw()
        circleArray[i].move()
    }
}

init()
animate()

