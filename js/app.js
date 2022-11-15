//* Global Variables *//
// Acceder al ancho del dispositivo
// let deviceWidth = window.innerWidth;

// Tamaño del cuadrado en px
let squareSize = 25;

// Cantidad de cuadrados horizontal y verticalmente
let horizontalSquares = 14;
let verticalSquares = 20;

// Velocidades del juego
let speed = 800; // Velocidad original del juego
let originSpeed = 800; // Velocidad original del juego
let dropSpeed = 50; // Velocidad al dejar caer los tetrominos

// Ancho y alto del canvas
let widthCanvas = squareSize * horizontalSquares;
let heightCanvas = squareSize * verticalSquares;

// Cargamos el canvas para la cuadrícula del juego
let canvas = document.getElementById( 'grid' );

// Definimos el ancho y alto que tendrá el canvas
canvas.width = widthCanvas;
canvas.height = heightCanvas;

let context = canvas.getContext("2d");

// Array tipo objeto para los tetrominos
/**
 * Tetrominos: I, J, L, O, S, T y Z
 * Rotaciones de los tetrominos:
 * 0 -> Rotación 0 grados -Posición original-
 * 1 -> Rotación 90 grados -Hacia la derecha-
 * 2 -> Rotación 180 grados -Hacia la derecha-
 * 3 -> Rotación 270 grados -Hacia la derecha-
 */

let tetrominos = [
  // I
  {
    fill: "#F27ECA",
    0: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],

    1: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [2, 1],
    ],

    2: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],

    3: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },

  // J
  {
    fill: "#30D9BA",
    0: [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],

    1: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],

    2: [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],

    3: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },

  // L
  {
    fill: "#1E82D9",
    0: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],

    1: [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
    ],

    2: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],

    3: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
  },

  // O
  {
    fill: "#8973D9",
    0: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
    ],

    1: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
    ],

    2: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
    ],

    3: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
    ],
  },

  // S
  {
    fill: "#8973D9",
    0: [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ],

    1: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],

    2: [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ],

    3: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  },

  // T
  {
    fill: "#F27ECA",
    0: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ],

    1: [
      [0, -1],
      [0, 0],
      [0, 1],
      [1, 0],
    ],

    2: [
      [0, 0],
      [1, -1],
      [2, 0],
      [1, 0],
    ],

    3: [
      [2, -1],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  },

  // Z
  {
    fill: "#30D9BA",
    0: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],

    1: [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 2],
    ],

    2: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],

    3: [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 2],
    ],
  },
];

// Tetromino Actual
let tetromino = null;

// Orientación del tetromino
let tetrominoOrientation = 2;

// Última posición del tetromino
let tetrominoPosition = [];

// Desplazamiento horizontal y vertical
let horizontalPosition = 4;
let verticalPosition = 0;

// Nuevo tetromino
let newTetromino = true;

// Cuando sea verdadero el último tetromino debe ser fijo
var fixed = false;

// Tiempo del último tetromino ubicado
let time = new Date();

// Cuadricula
/** 
 * Nota: La cuadricula tiene 3 tipos de campos:
 * Vacíos: Tienen valor 1
 * Ocupados: Tienen valor 2
 * Eliminados: Tienen valor en cadena
*/
let grid = [];

// Recargar cuadricula del juego
function resetGrid() {
  for (let i = 0; i < horizontalSquares; i++) {
    grid[i] = [];

    for (let j = 0; j < verticalSquares; j++) grid[i][j] = 1;
  }

  (fixed = false), (newTetromino = true), (verticalPosition = tetrominoOrientation = 0), (horizontalPosition = 6);
}
resetGrid();

// Dibujar líneas de la cuadricula
function line( fromX, fromY, toX, toY ) {
  context.beginPath();
  context.moveTo( fromX, fromY );
  context.lineTo( toX, toY );
  context.stroke();
}

// Estilos de las líneas de la cuadricula
context.strokeStyle = '#E9E9E9';
context.lineWidth = 0.5;

function drawGrid() {
  // Limpiamos la cuadricula
  context.clearRect(0, 0, widthCanvas, heightCanvas);
  let currentSquare, w, h, i;

  // Ciclo para dibujar el estado actual de la cuadricula
  for (w = 0; w < horizontalSquares; w++) {
    context.save();
    context.translate(w * squareSize, 0); // Movemos el canvas horizontalmente

    for (h = 0; h < verticalSquares; h++) {
      currentSquare = grid[w][h];
      context.save();
      context.translate(0, h * squareSize); // Movemos el canvas verticalmente

      if (currentSquare === 2) {
        context.fillStyle = tetromino.fill;
        context.fillRect(0, 0, squareSize, squareSize);
      } else if (typeof currentSquare === "string") {
        context.fillStyle = currentSquare;
        context.fillRect(0, 0, squareSize, squareSize);
      }
      context.restore();
    }
    context.restore();
  }

  // Cuadricula
  for (i = 1; i < widthCanvas; i++)
    line(i * squareSize, 0, i * squareSize, heightCanvas);

  for (i = 1; i < heightCanvas; i++)
    line(0, i * squareSize, widthCanvas, i * squareSize);
}