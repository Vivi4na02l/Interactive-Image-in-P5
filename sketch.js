body()
window.addEventListener("resize", body)

function body() {
    let H = window.innerHeight

    let divBackground = document.querySelector('#divBackground')
    divBackground.style.height = H + 'px'
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("divBackground");
}

function draw() {
  background(220);
}
