//* Declaration of variables

//Todo: Accedemos al valor del ancho de la ventana
let deviceWidth = window.innerWidth;

//Todo: Cargamos el canvas
let canvas = document.getElementById( 'grid' );
let context = canvas.getContext( '2d' );

//* Funciones

//Todo: Creamos la función para dibujar la cuadricula
function drawGrid() {
  if ( deviceWidth <= 375 ) {
    // Modifica el ancho y alto del canvas de acuerdo al dispositivo
    canvas.setAttribute( 'width', 350);
    canvas.setAttribute( 'height', 500);

    // Ciclo para dibujar las líneas horizontalmente
    for ( let x = 0; x <= 1000; x = x + 25 ) {
      context.moveTo( x, 0 );
      context.lineTo( x, 1000 );    
    }

    // Ciclo para dibujar las líneas verticalmente
    for ( let y = 0; y <= 1000; y = y + 25 ) {
      context.moveTo( 0, y );
      context.lineTo( 1000, y );
    }

    // Aplicar color al borde de la cuadricula
    context.strokeStyle = "#E9E9E9";
    context.stroke();
   } 
}

// Llamamos la función para dibujar la cuadricula
drawGrid();
