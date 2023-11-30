body()
function body() {
    let H = window.innerHeight

    let divBackground = document.querySelector('#divBackground')
    divBackground.style.height = H + 'px'
}

// window.addEventListener("resize", changedWindowSize)

function setup() {
  let canvasW = window.innerWidth*0.8
  let canvasH = (window.innerWidth*0.8)/1.7777
  let canvas = createCanvas(canvasW, canvasH);
  
  canvas.parent("divBackground");
}

function draw() {
  // let canvasW = window.innerWidth*0.8
  // let canvasH = (window.innerWidth*0.8)/1.7777
  background('#68c0d6');
  
  // line(width/2,
  //     10,
  //     width/2,
  //     100)

  

  // Janela do carro
  fill('#000'); // Cor da janela
  beginShape();
  vertex(0, 0); // A
  vertex(width, 0); // B
  vertex(width, height*0.8); // J

  // linha curvada vertical mais à direita
  bezierVertex(width, height*0.8, // J
              width*0.95, height*0.4,
              width*0.9, height*0.2); // F

  // linha curvada horizontal mais à direita e mais para cima
  bezierVertex(width*0.88, height*0.17, // F.2
              width*0.82, height*0.14,
              width*0.75, height*0.12); // E

  vertex(width*0.75, height*0.9); // I
  vertex(width, height*0.9); // K
  vertex(width, height); // M
  vertex(0, height); // L
  vertex(0, height*0.9); // G
  vertex(width*0.72, height*0.9); // H
  vertex(width*0.72, height*0.11); // D

  // linha curvada horizontal mais à esquerda e mais para cima
  bezierVertex(width*0.70, height*0.09, // D
              width*0.3, height*0.06,
              width*0, height*0.05); // C

  
  endShape(CLOSE);
}
