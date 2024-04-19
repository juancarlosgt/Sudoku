const container = document.querySelector(".sudoku-container");
const matriz = new Array(9).fill().map(() => new Array(9));
const botones = document.querySelectorAll(".boton");
const imagen = document.querySelector(".img-switch");
const lightmode = document.querySelector(".switch");
const header = document.querySelector("header")
let count = 1;
crear();
matriz.forEach((arreglo) => {
  arreglo.forEach((elemento) => {
    const item = document.createElement("div");
    item.classList.add("item-sudoku");
    item.setAttribute("id", `${count}`);
    item.innerHTML = `${elemento}`;
    container.append(item);
    count++;
  });
});
const cuadros = document.querySelectorAll(".item-sudoku");
let last = null;
let celda = null;
let selected = null;
cuadros.forEach((cuadro) => cuadro.addEventListener("click", (event) => {
  const itemId = event.currentTarget.id;
  celda = document.getElementById(itemId);
  if (last != null) last.classList.toggle("active");
  celda.classList.toggle("active");
  console.log(itemId);
  selected = celda;
  last = celda;
})
);
botones.forEach(boton => boton.addEventListener("click", (event) => {
  const itemId = event.currentTarget.id;
  let num = itemId == "borrar" ? "" : itemId.replace("boton", "");
  if (selected != null) {
    selected.innerHTML = `${num}`;
  }
}));
lightmode.addEventListener("change", (event) => {
  if (event.target.checked) {
    imagen.setAttribute("src","sun.png")
    imagen.classList.toggle("active");
    document.body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
  } else {
    imagen.setAttribute("src","moon.png")  
    imagen.classList.toggle("active");  
    document.body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
  }
});

/**
 * Funciones para crear el Sudoku
 */
function crear() {
  let cont = 0;
  let ciclos = 0;
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
}
function ponerCeros(i) {
  for (let x = 0; x < matriz.length; x++) {
    matriz[i][x] = 0;
  }
}

function sePuede(n, i, j) {
  return (
    !existeHorizontal(n, i) && !existeVertical(n, j) && !existe3x3(n, i, j)
  );
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
      if (
        Math.floor(y / 3) === Math.floor(i / 3) &&
        Math.floor(x / 3) === Math.floor(j / 3)
      ) {
        if (matriz[i][j] === n) {
          return true;
        }
      }
    }
  }
  return false;
}
