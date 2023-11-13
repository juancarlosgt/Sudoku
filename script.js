const matriz = new Array(9).fill().map(() => new Array(9));
//crear();

function crear() {
  let cont = 0;
  let ciclos = 0;
  const first = new Date().getTime();
  let last;
  
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const numero = Math.floor(1 + Math.random() * 9);
      if (sePuede(numero, i, j)) {
        matriz[i][j] = numero;
        cont = 0;
      } else {
        j--;
        cont++;
      }
      if (cont > 20) {
        ponerCeros(i);
        cont = 0;
        j = -1;
      }
      ciclos++;
    }
  }
  
  last = new Date().getTime();
  console.log("Tiempo: " + (last - first) + " ms" + "\nCiclos: " + ciclos);
  document.write("Tiempo: " + (last - first) + " ms" + "\nCiclos: " + ciclos);
  imprimir();
}

function ponerCeros(i) {
  for (let x = 0; x < matriz.length; x++) {
    matriz[i][x] = 0;
  }
}

function sePuede(n, i, j) {
  return !existeHorizontal(n, i) && !existeVertical(n, j) && !existe3x3(n, i, j);
}

function existeHorizontal(n, i) {
  for (let t = 0; t < matriz[i].length; t++) {
    if (n === matriz[i][t]) {
      return true;
    }
  }
  return false;
}

function existeVertical(n, j) {
  for (let t = 0; t < matriz[j].length; t++) {
    if (n === matriz[t][j]) {
      return true;
    }
  }
  return false;
}

function existe3x3(n, y, x) {
  for (let i = Math.floor(y / 3) * 3; i < matriz.length; i++) {
    for (let j = Math.floor(x / 3) * 3; j < matriz[i].length; j++) {
      if (Math.floor(y / 3) === Math.floor(i / 3) && Math.floor(x / 3) === Math.floor(j / 3)) {
        if (matriz[i][j] === n) {
          return true;
        }
      }
    }
  }
  return false;
}

function imprimir() {
  for (let i = 0; i < matriz.length; i++) {
    let row = "";
    for (let j = 0; j < matriz[i].length; j++) {
      row += matriz[i][j] + "  ";
    }
    console.log(row);
    document.write("<br>"+row);
  }
  console.log("____________");
  document.write("____________");
}
document.getElementById("crear").addEventListener("click",crear);

