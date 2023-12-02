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

// variáveis
let speedRail = (window.innerWidth*0.8)/10; // /5
let posRail = 0;

function draw() {
  clear();
  background('#68c0d6');

  wall();
  riverDraw();
  handrail();
  carDraw();

  frameRate(10);
}

function wall() {
  let pos = 0;
  noStroke();
  fill('#443535');
  beginShape();

  vertex(pos, height*0.45); // posRail+
  vertex(pos+width/5.5, height*0.45);
  vertex(pos+width/5.5, height*0.42);
  vertex(pos+width/5, height*0.42);
  vertex(pos+width/5, height*0.65); // altura final do muro = altura inicial do rio
  

  endShape();
}

// função que cria o rio
function riverDraw() {
  noStroke();
  fill('#2c7aaa');
  rect(0, height*0.65, width, height*0.35);
}

// função que cria o corrimão
function handrail() {
  noStroke();
  fill('#373a37');

  for (let i = 0; i < 6; i++) {
    pos = i * width/5;

    beginShape();

    vertex(posRail+pos, height*0.8); // posRail+
    vertex(posRail+pos+width/5.5, height*0.8);
    vertex(posRail+pos+width/5.5, height*0.78);
    vertex(posRail+pos+width/5, height*0.78);
    vertex(posRail+pos+width/5, height);
  
    vertex(posRail+pos+width/5.5, height);
    vertex(posRail+pos+width/5.5, height*0.83);
    vertex(posRail+pos, height*0.83);
    
    endShape();
  }

  if (posRail >= width/10) {
    posRail = 0;
  } else {
    posRail = posRail + speedRail;
  }
}

// função que desenha a forma da janela do carro
function carDraw() {
  // Janela do carro
  stroke('#000');
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