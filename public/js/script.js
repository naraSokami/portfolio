import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"





// const loading = () => {
//     let mouse = {
//         x: undefined,
//         y: undefined
//     }
    
//     window.addEventListener("mouseover", e => {
//         console.log(e.x, e.y);
//         mouse.x = e.x;
//         mouse.y = e.y;
        
            // [...document.querySelectorAll('.circle')].forEach(
            //     circle => {
            //         circle.width = e.x
            //         circle.height = e.x
            //         console.log(circle.width, circle.height);
            //     }
//     })
// }

// loading()

let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

console.log(ctx);
// console.log(canvas);

const maxSize = 10
const minSize = 4
const maxSpeed = 3 
const particlesList = []
let hue = 0

const mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    addParticles(1)
})


canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

ctx.fillStyle = '#dddddd'

class Particle {
    constructor() {
        this.x = mouse.x || Math.random() * window.innerWidth;
        this.y = mouse.y || Math.random() * window.innerHeight;
        this.size = Math.random() * maxSize + minSize
        this.speedX = Math.random() * maxSpeed - maxSpeed / 2
        this.speedY = Math.random() * maxSpeed - maxSpeed / 2
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    
    be() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
    
    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
    }
}

function addParticles(num) {
    for (let i = 0; i < num; i++) {
        particlesList.push(new Particle()) 
    } 
}

const init = () => {
    addParticles(100)
    let intervalId = setInterval(() => {
        if (particlesList.length <= 0) {
            clearInterval(intervalId)
        }
    }, 100)
}

const handleParticles = () => {
    for (let i = 0; i < particlesList.length; i++) {
        particlesList[i].update()
        particlesList[i].be()

        for (let j = i; j < particlesList.length; j++) {
            let dx = particlesList[i].x - particlesList[j].x
            let dy = particlesList[i].y - particlesList[j].y
            let distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
                ctx.beginPath()
                ctx.strokeStyle = particlesList[i].color
                ctx.lineWidth = 0.3
                ctx.moveTo(particlesList[i].x, particlesList[i].y)
                ctx.lineTo(particlesList[j].x, particlesList[j].y)
                ctx.stroke()
                ctx.closePath()
            }
        }

        if (particlesList[i].size < 0.3) {
            particlesList.splice(i, 1)
            i--
        }
    }
}


window.setInterval(() => {
    addParticles(1)
}, 10)


init() 
console.log(particlesList);

const animate = () => {
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    handleParticles();

    // [...document.querySelectorAll('.circle')].forEach(
    //     circle => {    
    //         circle.style.borderColor = ``
    //     }
    // )
    document.documentElement.style.setProperty('--color', `hsl(${hue}, 100%, 50%)`)

    hue += 1
}

animate()