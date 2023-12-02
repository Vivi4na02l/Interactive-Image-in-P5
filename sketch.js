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

let speedWall = (window.innerWidth*0.8)/35;
let posWall = 0;

function draw() {
  clear();
  background('#68c0d6');

  wall();
  riverDraw();
  handrail();
  carDraw();

  frameRate(15);
}

function wall() {
  noStroke();

  //* "Chão" do muro */
  fill('#38372d');
  beginShape();

  vertex(0, height*0.645);
  vertex(width, height*0.645); /* width aqui está completa pois o "chão" do muro é sempre igual mesmo em movimento */ 
  vertex(width, height*0.7); // altura final do muro = altura inicial do rio
  vertex(0, height*0.7);

  endShape();


  for (let i = -1; i < 6; i++) {
    pos = (i * width) / 5 + posWall;
      
    //* "Moldura" do muro */
    fill('#424135');
    beginShape();

    vertex(pos, height*0.45); // 
    vertex(pos+width/5.5, height*0.45);
    vertex(pos+width/5.5, height*0.42);
    vertex(pos+width/5, height*0.42);
    vertex(pos+width/5, height*0.65); // altura final do muro = altura inicial do rio
    vertex(pos+width/5.5, height*0.65);
    vertex(pos+width/5.5, height*0.48);
    vertex(pos, height*0.48);

    endShape();


    //* Interior do muro */  
    fill('#293326');
    beginShape();

    vertex(pos, height*0.48);
    vertex(pos+width/5.45, height*0.48);
    vertex(pos+width/5.45, height*0.65);
    vertex(pos, height*0.65); // altura final do muro = altura inicial do rio

    endShape();
  }

  if (posWall >= width / 10) {
    posWall = 0;
  } else {
    posWall = posWall + speedWall;
  }
}

// função que cria o rio
function riverDraw() {
  noStroke();
  fill('#2c7aaa');
  rect(0, height*0.7, width, height*0.35);
}

// função que cria o corrimão
function handrail() {
  noStroke();
  fill('#373a37');

  for (let i = -1; i < 6; i++) {
    pos = (i * width) / 5 + posRail;

    beginShape();

    vertex(pos, height*0.8); 
    vertex(pos+width/5.5, height*0.8);
    vertex(pos+width/5.5, height*0.78);
    vertex(pos+width/5, height*0.78);
    vertex(pos+width/5, height);
  
    vertex(pos+width/5.5, height);
    vertex(pos+width/5.5, height*0.83);
    vertex(pos, height*0.83);
    
    endShape();
  }

  if (posRail >= width / 5) {
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