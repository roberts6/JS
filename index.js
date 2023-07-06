// Definir una lista de precios de tenis Jordan
let ZapasJordan = [
  {nombre: 'Jordan Air 1', precio: 150, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  {nombre: 'Jordan Air 4', precio: 220, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  // {nombre: 'Jordan Air 4', precio: 230, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  // {nombre: 'Jordan Air 11', precio: 210, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  // {nombre: 'Jordan Retro High OG', precio: 320, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  // {nombre: 'Jordan Air 5', precio: 300, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  // {nombre: 'Jordan Air 5', precio: 220, modelo: 'Adultos', genero: 'Niños', cantidad: 0},
  // {nombre: 'Jordan Dunk High Retro', precio: 200, modelo: 'Adultos', genero: 'Niños', cantidad: 0}
];

// Uso con prompt
const carrito = [];
for (let i = 0; i < ZapasJordan.length; i++) {
  let pedido = prompt(`Ingresa la cantidad de tenis Jordan del modelo ${ZapasJordan[i].nombre} Género: ${ZapasJordan[i].genero}`);
  console.log(`Quiere ${pedido} del modelo ${ZapasJordan[i].nombre}`);
  let cantidad = parseInt(ZapasJordan[i].cantidad) + parseInt(pedido);
  cantidad >= 0 ? carrito.push({ nombre: ZapasJordan[i].nombre,genero: ZapasJordan[i].genero, precio: ZapasJordan[i].precio, cantidad: cantidad, total: (ZapasJordan[i].precio * cantidad)}) : alert('No haz elegido nada');
}

// Función para calcular el valor total de las zapatillas Jordan
const calcularValorTotal = (carrito) => {
  let valorTotal = 0;
  carrito.forEach((producto) => {
    let precioProducto = ZapasJordan.find(zapa => zapa.nombre === producto.nombre).precio;
    valorTotal += precioProducto * producto.cantidad;
  });
  return valorTotal;
}

let total = calcularValorTotal(carrito);
console.table(carrito);
console.log("El valor total de los tenis Jordan es: $" + total);
let precioTotalElement = document.getElementById("precioTotal");
precioTotalElement.innerHTML = `El valor total de los tenis Jordan es: ${total}`;