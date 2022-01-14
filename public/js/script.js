import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

let mouse = {
    x: null,
    y: null
}

document.addEventListener("mouse", e => {
    mouse.x = e.x
    mouse.y = e.y
})

const loading = () => {
    let circles = document.querySelectorAll('.circle')

}

loading()