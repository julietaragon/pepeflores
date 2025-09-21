let flores = [];
let acumuladas = [];
let corazon = [];
let mostrarMensaje = false;
let cancion;
let florSize;

function preload() {
cancion = loadSound('primavera.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  florSize = min(width, height) / 60;

  // Generar muchas flores iniciales
  for (let i = 0; i < 300; i++) {
    flores.push(new Flor(random(width), random(-1000, -50)));
  }

  
  let scaleFactor = min(width, height) / 25;
  for (let t = 0; t < TWO_PI; t += 0.1) {
    let x = 16 * pow(sin(t), 3);
    let y = -(13 * cos(t) - 5 * cos(2*t) - 2*cos(3*t) - cos(4*t));
    corazon.push(createVector(width/2 + x * scaleFactor, height/2 + y * scaleFactor));
  }
}

function draw() {
  background(255, 240, 200); // color suave pastel

  // Actualizar y mostrar flores cayendo
  for (let i = flores.length - 1; i >= 0; i--) {
    let f = flores[i];
    f.update();
    f.display();

    if (f.y > height - 5) {
      acumuladas.push(new Flor(f.x, height - random(0, 15)));
      flores.splice(i, 1);
    }
  }

  // Dibujar flores acumuladas
  for (let f of acumuladas) {
    f.display();
  }

  // Dibujar corazón de flores
  for (let p of corazon) {
    drawFlor(p.x, p.y, florSize);
  }

  // Mostrar mensaje
  if (mostrarMensaje) {
    fill(255, 100, 150);
    textSize(min(width, height) / 15);
    textAlign(CENTER, CENTER);
    text("Feliz primavera keke <3", width / 2, height / 2);
  }

  // Agrega nuevas flores continuamente
  if (frameCount % 2 === 0) {
    flores.push(new Flor(random(width), -20));
  }
}

function mousePressed() {
  mostrarMensaje = true;

  if (cancion && !cancion.isPlaying()) {
   cancion.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Clase Flor
class Flor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(florSize * 0.8, florSize * 1.2);
    this.speed = random(1, 3);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    drawFlor(this.x, this.y, this.size);
  }
}

// Dibujar una flor sencilla estilo lirio
function drawFlor(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 204, 0); // amarillo
  for (let i = 0; i < 5; i++) {
    ellipse(0, s, s / 1.5, s * 2);
    rotate(PI / 2.5);
  }
  fill(255, 150, 0);
  ellipse(0, 0, s, s);
  pop();
}

