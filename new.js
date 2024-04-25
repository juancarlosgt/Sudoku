const container = document.querySelector(".sudoku-container");
const matriz = new Array(9).fill().map(() => new Array(9));
const botones = document.querySelectorAll(".boton");
const imagen = document.querySelector(".img-switch");
const lightmode = document.querySelector(".switch");
const header = document.querySelector("header")
let count = 1;
crear();
copia = { ...matriz };
let borrarCelda = 60;

matriz.forEach((arreglo) => {
  arreglo.forEach((elemento) => {
    const item = document.createElement("div");
    item.classList.add("item-sudoku");
    item.setAttribute("id", `${count}`);
    item.setAttribute("editable", false);
    item.classList.add("editable");
    item.innerHTML = `${elemento}`;
    container.append(item);
    if (count % 3 == 0 && count % 9 != 0) {
      item.classList.add("right")
    }
    if ((count >= 19 && count <= 27) || (count >= 46 && count <= 54)) {
      item.classList.add("bottom")
    }
    count++;
  });
});
while (borrarCelda--) {
  const numero = Math.floor(1 + Math.random() * 81);
  div = document.getElementById(numero);
  div.innerHTML = ``;
  div.setAttribute("editable", true);
  div.classList.remove("editable")
}
const cuadros = document.querySelectorAll(".item-sudoku");
let last = null;
let celda = null;
let selected = null;
cuadros.forEach((cuadro) => cuadro.addEventListener("click", (event) => {
  const itemId = event.currentTarget.id;
  celda = document.getElementById(itemId);
  if (last != null) last.classList.toggle("active");
  celda.classList.toggle("active");
  selected = celda;
  last = celda;
  paint(itemId);
  comprobar(cuadro)
}));

botones.forEach(boton => boton.addEventListener("click", (event) => {
  const itemId = event.currentTarget.id;
  let num = itemId == "borrar" ? "" : itemId.replace("boton", "");
  if (selected != null && selected.attributes[2].value != "false") {
    selected.innerHTML = `${num}`;
    comprobar(selected)
  }
}));
lightmode.addEventListener("change", (event) => {
  if (event.target.checked) {
    imagen.setAttribute("src", "sun.png")
    imagen.classList.toggle("active");
    document.body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
  } else {
    imagen.setAttribute("src", "moon.png")
    imagen.classList.toggle("active");
    document.body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
  }
});
function paint(n) {
  cuadros.forEach(cuadro => {
    cuadro.classList.remove("paint","error");
  })
  let temp = n - 1;
  while (temp % 9 != 0) {
    item = document.getElementById(temp);
    item.classList.toggle("paint");
    temp--;
  }
  temp = parseInt(n);  
  while (temp % 9 != 0 && n % 9 != 0) {
    temp++;
    item = document.getElementById(temp);
    item.classList.toggle("paint");
  }
  temp = n - 9;
  while (temp > 0) {
    item = document.getElementById(temp);
    item.classList.toggle("paint");
    temp = temp - 9;
  }
  temp = parseInt(n) + 9;
  while (temp <= 81) {
    item = document.getElementById(temp);
    item.classList.toggle("paint");
    temp = temp + 9;
  }
  let y = Math.ceil(n / 9) - 1
  let x = (n % 9 == 0 ? 9 : n % 9) - 1;
  cuadros.forEach(cuadro => {
    let v = cuadro.id;
    let yi = Math.ceil(v / 9) - 1;
    let xi = (v % 9 == 0 ? 9 : v % 9) - 1;
    if (
      Math.floor(y / 3) === Math.floor(yi / 3) &&
      Math.floor(x / 3) === Math.floor(xi / 3) && (xi != x && yi != y)
    ) {
      cuadro.classList.add("paint");
    }
  })
}
/**
 * Funciones para comprobar el sudoku
 */
function comprobar(item) {
  cuadros.forEach(cuadro => {
    cuadro.classList.remove("error");
  })
  comprobarHori(item);
  comprobarVerti(item);
  comprobar3x3(item);
}
function comprobarHori(element){
  let value = parseInt(element.innerHTML)
  let temp = parseInt(element.id) - 1
  while (temp % 9 != 0) {
    item = document.getElementById(temp);    
    if(value == parseInt(item.innerHTML)){
      item.classList.toggle("error");
    }
    temp--;
  }
  temp = parseInt(element.id);  
  while (temp % 9 != 0 && element.id % 9 != 0) {
    temp++;
    item = document.getElementById(temp);
    if(value == parseInt(item.innerHTML)){
      item.classList.toggle("error");
    }
  }

}
function comprobarVerti(element){
  let value = parseInt(element.innerHTML)
  let temp = element.id - 9;
  while (temp > 0) {
    item = document.getElementById(temp);
    if(value == parseInt(item.innerHTML)){
      item.classList.toggle("error");
    }
    temp = temp - 9;
  }
  temp = parseInt(element.id) + 9;
  while (temp <= 81) {
    item = document.getElementById(temp);
    if(value == parseInt(item.innerHTML)){
      item.classList.toggle("error");
    }
    temp = temp + 9;
  }
}
function comprobar3x3(element){
  let value = parseInt(element.innerHTML)
  let n = parseInt(element.id)
  let y = Math.ceil(n / 9) - 1
  let x = (n % 9 == 0 ? 9 : n % 9) - 1;
  cuadros.forEach(cuadro => {
    let v = cuadro.id;
    let yi = Math.ceil(v / 9) - 1;
    let xi = (v % 9 == 0 ? 9 : v % 9) - 1;
    if (
      Math.floor(y / 3) === Math.floor(yi / 3) &&
      Math.floor(x / 3) === Math.floor(xi / 3) && (xi != x && yi != y)
    ) {
      if(value==cuadro.innerHTML)cuadro.classList.toggle("error");      
    }
  })
}
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
      if (cont > 50) {
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
