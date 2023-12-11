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

//* Variáveis */
// let nbrBuildings = [1,2,3,4];
// let randomBuilding = Math.floor(Math.random() * nbrBuildings.length) + 1;
// nbrBuildings = nbrBuildings.filter(nbr => nbr != randomBuilding);

let buildingColors = [
  { //* 1 */
    daylight: {
      building: '#808080',
      windows: '#373b4f',
      details: '#231b0e',
    },
    nighttime: {
     building: '#',
     windows: '#',
     details: '#',
    }
  },
  { //* 2 */
    daylight: {
      building: '#b7b5a1',
      windows: '#373b4f',
      details: '#231b0e',
    },
    nighttime: {
     building: '#',
     windows: '#',
     details: '#',
    }
  },
  { //* 3 */
    daylight: {
      building: '#dddddd',
      windows: '#434860',
    },
    nighttime: {
     building: '#',
     windows: '#',
    }
  },
  { //* 4 */
    daylight: {
      building: '#dadce8',
      building2: '#3d4366',
      windows: '#3d4366',
      details: '#000000',
    },
    nighttime: {
      building: '#',
      building2: '#',
      windows: '#',
      details: '#',
    }
  },
]

let scenarioColors = {
  activeTime: {
    sky: '#68c0d6',
    road: '#606060',
    wallExterior: '#424135',
    wallInterior: '#293326',
    wallFloor: '#38372d',
    rail: '#373a37',
  },
  dayTime: {
    sky: '#68c0d6',
    road: '#606060',
    wallExterior: '#424135',
    wallInterior: '#293326',
    wallFloor: '#38372d',
    rail: '#373a37',
  },
  nightTime: {
    sky: '#1e212d',
    road: '#2c7aaa',
    wallExterior: '#424135',
    wallInterior: '#293326',
    wallFloor: '#38372d',
    rail: '#373a37',
  },
}

let speedRail = (window.innerWidth*0.8)/10; // /5
let posRail = 0;

let speedRoad = (window.innerWidth*0.8)/10;
let posRoad = -(window.innerWidth*0.8)/3;

let speedWall = (window.innerWidth*0.8)/35;
let posWall = 0;

let speedB1 = (window.innerWidth * 0.8) / 100;
let posB1 = -(window.innerWidth * 0.8)*0.3;

let speedB2 = (window.innerWidth * 0.8) / 130;
let posB2 = -(window.innerWidth * 0.8)*0.15;

let speedB3 = (window.innerWidth * 0.8) / 180;
let posB3 = -(window.innerWidth * 0.8)*0.2;

let speedB4 = (window.innerWidth * 0.8) / 150;
let posB4 = -(window.innerWidth * 0.8)*0.15;

let nbrBuildings = 0;
let buildingsArray = [];
let totalBuildingsArray = [
  {
    building: "building3",
    width: (window.innerWidth * 0.8)*0.2,
    pos: posB3,
    speed: speedB3
  },
  {
    building: "building2",
    width: (window.innerWidth * 0.8)*0.15,
    pos: posB2,
    speed: speedB2
  },
  {
    building: "building4",
    width: (window.innerWidth * 0.8)*0.15,
    pos: posB4,
    speed: speedB4
  },
  {
    building: "building1",
    width: (window.innerWidth * 0.8)*0.3,
    pos: posB1,
    speed: speedB1
  },
];

function draw() {
  clear();
  background(scenarioColors.activeTime.sky);

  if (nbrBuildings == 0) {
    nbrBuildings = Math.floor(Math.random() * (totalBuildingsArray.length - 2)) + 2 /* (max - min) + min */

                        /* número de prédios a tirar do array */
    for (let i = 0; i < (totalBuildingsArray.length - nbrBuildings); i++) {
      let radBuilding = Math.floor(Math.random() * totalBuildingsArray.length);
      buildingsArray = totalBuildingsArray.filter(b => b.building != totalBuildingsArray[radBuilding].building)
    }
  }
  else {
    for (const bd of buildingsArray) {
      if (bd.pos < width + bd.width) {
        drawBuilding(bd);
      }
      else {
        nbrBuildings -= 1;
        buildingsArray = buildingsArray.filter(b => b.building != bd.building)
        bd.pos = -width - bd.width /** -bd.width */
      }
    }
  }

  wall();
  roadDraw();
  // handrail();
  carDraw();

  frameRate(15);
}

function drawBuilding(bd) {
  if (bd.building == "building3") {
    bd.pos += bd.speed;
    building3(bd.pos);
  } else if (bd.building == "building2") {
    bd.pos += bd.speed;
    building2(bd.pos);
  } else if (bd.building == "building4") {
    bd.pos += bd.speed;
    building4(bd.pos);
  } else if (bd.building == "building1") {
    bd.pos += bd.speed;
    building1(bd.pos);
  }
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
    vertex(pos+width/5, height*0.65); // altura final do muro = altura inicial do "chão" do muro
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
    vertex(pos, height*0.65); // altura final do muro = altura inicial do "chão" do muro

    endShape();
  }

  if (posWall >= width / 10) {
    posWall = 0;
  } else {
    posWall = posWall + speedWall;
  }
}

function building4(posB4) {
  let posY = height*0.15;
  let buildingWidth = width*0.15;
  let buildingHeight = width*0.2;

  //* Prédio */
  strokeWeight(4);
  stroke('#3d4366');
  fill('#dadce8');
  rect(posB4, posY,
      buildingWidth, buildingHeight);

  //* Parte do meio */
  noStroke();
  fill('#3d4366');
  rect(posB4+buildingWidth/2-(buildingWidth/4)/2, posY*0.8,
      buildingWidth/4, buildingHeight);

  //* Janelas */
  strokeWeight(1);
  stroke('#000');
  drawWindows(posB4, posY*1.2, buildingWidth*0.12, buildingHeight*0.1, 4, 2, buildingWidth);
  function drawWindows(posX, y, wW, wH, nbrFloors, nbrWindows, buildingWidth) {
    //* "for" para cada linha de janelas */
    for (let i = 0; i < nbrFloors; i++) {
      if (i != 0) {
        y += wH + wH*1.1 // define a distância vertical entre as janelas
      }

      //* "for" para cada janela individual */
      for (let j = 0; j < nbrWindows; j++) {
        if (j == 0) {
          x = posX + wW*0.2 // reseta a distância inicial por cada loop de "j"
          x += buildingWidth*0.05 // define a distância inicial da janela à borda do prédio
        } else {
          x += buildingWidth*0.62 // define a distância horizontal entre as janelas
        }

        rect(x, y, wW, wH);
        rect(x+wW, y, wW, wH);
      }
    }
  }
}

function building3(posB3) {
  noStroke();

  let buildingWidth = width*0.2;
  let buildingHeight = width*0.3;

  //* Prédio */
  fill('#dddddd');
  rect(posB3, 0,
      buildingWidth, buildingHeight);

  //* Janelas */
  fill('#434860');

  drawWindows(posB3, buildingHeight*0.15, buildingWidth*0.13, buildingHeight*0.9, 4);
  function drawWindows(posX, y, wW, wH, nbrWindows) {
  //* "for" para cada janela individual */
    for (let j = 0; j < nbrWindows; j++) {
      if (j == 0) {
        x = posX + wW*0.2 // reseta a distância inicial por cada loop de "j"
        x += wW*0.5 // define a distância inicial da janela à borda do prédio
      } else {
        x += wW + wW*0.7 // define a distância horizontal entre as janelas
      }

      rect(x, y, wW, wH);
    }
  }
}

function building2(posB2) {
  noStroke();

  let buildingWidth = width*0.15;
  let buildingHeight = width*0.3;

  //* Prédio */
  fill('#b7b5a1');
  rect(posB2, 0,
      buildingWidth, buildingHeight);

  //* Janelas */
  strokeWeight(2);
  stroke('#231b0e');
  fill('#373b4f');

  drawWindows(posB2, buildingHeight*0.15, buildingWidth*0.1, buildingHeight*0.1, 5, 4);
  function drawWindows(posX, y, wW, wH, nbrFloors, nbrWindows) {
    //* "for" para cada linha de janelas */
    for (let i = 0; i < nbrFloors; i++) {
      if (i != 0) {
        y += wH + wH*0.6 // define a distância vertical entre as janelas
      }

      //* "for" para cada janela individual */
      for (let j = 0; j < nbrWindows; j++) {
        if (j == 0) {
          x = posX + wW*0.2 // reseta a distância inicial por cada loop de "j"
          x += wW*0.6 // define a distância inicial da janela à borda do prédio
        } else {
          x += wW + wH*0.7 // define a distância horizontal entre as janelas
        }

        rect(x, y, wW, wH);
      }
    }
  }
}

function building1(posB1) {
  noStroke();

  //* Faz o prédio mexer ou parar */
  // if (posB1 < width) {
  //   posB1 = frameCount * speedB1;  
  // }
  
  // let posX = 0;

  let posY = height*0.2;
  let buildingWidth = width*0.3;
  let buildingHeight = width*0.2;

  //* Telhado */
  fill('#231b0e');

  beginShape();

  vertex(posB1, posY-height*0.01);
  vertex(posB1+buildingWidth/4, posY-height*0.01);
  vertex(posB1+buildingWidth/4, posY-height*0.02);
  vertex(posB1+buildingWidth/2, posY-height*0.02);
  vertex(posB1+buildingWidth/2, posY-height*0.01);
  vertex(posB1+buildingWidth*0.85, posY-height*0.01);
  vertex(posB1+buildingWidth*0.85, posY-height*0.02);
  vertex(posB1+buildingWidth*0.9, posY-height*0.02);
  vertex(posB1+buildingWidth*0.9, posY-height*0.01);
  vertex(posB1+buildingWidth, posY-height*0.01);
  vertex(posB1+buildingWidth, posY);
  vertex(posB1, posY);

  endShape();


  //* Prédio */
  fill('#808080');
  rect(posB1, posY,
      buildingWidth, buildingHeight);

  
  //* Janelas */
  strokeWeight(2);
  stroke('#231b0e');
  fill('#373b4f');

  drawWindows(posB1, posY*1.15, buildingWidth*0.1, buildingHeight*0.1, 4, 6);
  function drawWindows(posX, y, wW, wH, nbrFloors, nbrWindows) {
    //* "for" para cada linha de janelas */
    for (let i = 0; i < nbrFloors; i++) {
      if (i != 0) {
        y += wH + wH*0.6 // define a distância vertical entre as janelas
      }

      //* "for" para cada janela individual */
      for (let j = 0; j < nbrWindows; j++) {
        if (j == 0) {
          x = posX + wW*0.2 // reseta a distância inicial por cada loop de "j"
          x += wW*0.3 // define a distância inicial da janela à borda do prédio
        } else {
          x += wW + wH*0.9 // define a distância horizontal entre as janelas
        }

        rect(x, y, wW, wH);
      }
    }
  }
}

// função que cria a estrada
function roadDraw() {
  noStroke();
  fill(scenarioColors.activeTime.road);
  rect(0, height*0.7, width, height*0.35);

  posRoad += speedRoad;

  // Verifica se o retângulo branco original atingiu um terço da largura do canvas
  if (posRoad >= width / 3) {
    // Adiciona um novo retângulo branco
    fill('#fff');
    rect(posRoad - width, height*0.85, width * 0.05, height*0.02);
  }

  // Desenha o retângulo branco original
  fill('#fff');
  rect(posRoad, height*0.85, width * 0.05, height*0.02);

  // Verifica se o retângulo original saiu completamente do canvas
  if (posRoad >= width) {
    posRoad = 0;
  }
}

function cars() {
  
}

// função que cria o corrimão
function handrail() {
  noStroke();
  fill(scenarioColors.activeTime.rail);

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