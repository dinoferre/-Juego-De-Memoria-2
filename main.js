//Inicio de Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

//Sonidos
let winAudio = new Audio("./sound/winner.wav");
let loseAudio = new Audio("./sound/lose.wav");
let clickAudio = new Audio("./sound/click.wav");
let aciertoAudio = new Audio("./sound/acierto.wav");
let errorAudio = new Audio("./sound/error.wav");

//Apuntando a documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random() - 0.5})
console.log(numeros)

//Funciones
function contarTiempo(){
  tiempoRegresivoId = setInterval(()=>{
      timer--;
      mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
      if(timer == 0){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
        loseAudio.play();
      }
    },1000)
}

function bloquearTarjetas(){
  for (let i = 0; i<=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal
function destapar(id){
    if (temporizador == false){
      contarTiempo();
      temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)
    if(tarjetasDestapadas == 1){
      //Mostrar el primer numero
      tarjeta1 = document.getElementById(id);
      primerResultado = numeros[id];
      tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
      clickAudio.play();

      //Deshabilitar el primer boton
      tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2){
      //Mostrar el segundo numero
      tarjeta2 = document.getElementById(id);
      segundoResultado = numeros[id];
      tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;

      //Deshabilitar el primer boton
      tarjeta2.disabled = true;
      //Incrementar movimientos
      movimientos++;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

      if(primerResultado == segundoResultado){
        //Encerrar contador
        tarjetasDestapadas = 0;

        //Aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        aciertoAudio.play();

        if(aciertos == 8){
          winAudio.play();
          clearInterval(tiempoRegresivoId);
          mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
          mostrarTiempo.innerHTML = `👏 Demoraste ${timerInicial - timer} segundos`;
          mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
        }
      } else {
        //Mostrar valores y volver a tapar
        errorAudio.play();
        setTimeout(()=>{
          tarjeta1.innerHTML = " ";
          tarjeta2.innerHTML = " ";
          tarjeta1.disabled = false;
          tarjeta2.disabled = false;
          tarjetasDestapadas = 0;
        },800)
      }
    }
}