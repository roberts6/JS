// Definir una lista de precios de tenis Jordan
let ZapasJordan = [
  {id:1, nombre: 'Jordan Air 1', precio: 150, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  {id:2, nombre: 'Jordan Air 4', precio: 220, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  {id:3, nombre: 'Jordan Air 4', precio: 230, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  {id:4, nombre: 'Jordan Air 11', precio: 210, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  {id:5, nombre: 'Jordan Retro High OG', precio: 320, modelo: 'Adultos', genero: 'Mujer', cantidad: 0},
  {id:6, nombre: 'Jordan Air 5', precio: 300, modelo: 'Adultos', genero: 'hombres', cantidad: 0},
  {id:7, nombre: 'Jordan Air 5', precio: 220, modelo: 'Adultos', genero: 'Niños', cantidad: 0},
  {id:8, nombre: 'Jordan Dunk High Retro', precio: 200, modelo: 'Adultos', genero: 'Niños', cantidad: 0}
];

// Uso con prompt
const carrito = [];/* 
for (let i = 0; i < ZapasJordan.length; i++) {
  let pedido = prompt(`Ingresa la cantidad de tenis Jordan del modelo ${ZapasJordan[i].nombre} Género: ${ZapasJordan[i].genero}`);
  console.log(`Quiere ${pedido} del modelo ${ZapasJordan[i].nombre}`);
  let cantidad = parseInt(ZapasJordan[i].cantidad) + parseInt(pedido);
  cantidad >= 0 ? carrito.push({ nombre: ZapasJordan[i].nombre,genero: ZapasJordan[i].genero, precio: ZapasJordan[i].precio, cantidad: cantidad, total: (ZapasJordan[i].precio * cantidad)}) : alert('No haz elegido nada');
} */

// Función para calcular el valor total de las zapatillas Jordan
const calcularValorTotal = (carrito,productos) => {
  let valorTotal = 0;
  carrito.forEach((producto) => {
    let precioProducto = productos.find(zapa => zapa.nombre === producto.nombre).precio;
    valorTotal += precioProducto * producto.cantidad;
  });
  return valorTotal;
}

// Captura el contenedor en el hTML
let productoEnElCarrito = document.getElementById("productosEnElCarrito");


// tabla que contiene el total del array carrito
// const imprimirCarrito = () => {
//   let tablaHTML = `
//     <table>
//       <thead>
//         <tr>
//           <th>Producto</th>
//           <th>Cantidad</th>
//         </tr>
//       </thead>
//       <tbody>
//   `;
//   carrito.forEach(producto => {
//     let imprimirNombre = producto.nombre;
//     let imprimirCantidad = producto.cantidad;
//     tablaHTML += `
//       <tr>
//         <td>${imprimirNombre}</td>
//         <td>${imprimirCantidad}</td>
//       </tr>
//     `;
//   });
//   tablaHTML += `
//       </tbody>
//     </table>
//   `;
  
//   productoEnElCarrito.innerHTML = tablaHTML;
// }
// imprimirCarrito()

// funcionalidad de crear cards 
const card = (producto) => {
  return `
  <div class = "card">
     <div class = "imgCard"><img src = "${producto.img}"></div>
     <div class = "imgCard"><p>${producto.nombre}</p></div>
     <div class = "imgCard"><p>Género: ${producto.genero}</p></div>
     <div class = "imgCard"><p><b>$${producto.precio}</b></p></div>
     <button class = "botonAgregar" id=${producto.id}>Agregar</button>
  </div>
  `
}
// luego mostrar una card por cada producto en la BDD
const cargarCard = (array) => {
  productoEnElCarrito.innerHTML = ''
  array.forEach((producto) => {
  productoEnElCarrito.innerHTML += card(producto)
})
}
cargarCard(ZapasJordan)


// Funcionalidad del buscador 
const inputSearch = document.querySelector('#buscador')
inputSearch.addEventListener('search', () => {
  const inputSearchResult = inputSearch.value.toLocaleLowerCase();
  const resultado = ZapasJordan.filter((zapa) => zapa.nombre.toLocaleLowerCase().includes(inputSearchResult))
  console.table(resultado)
  cargarCard(resultado)
})

// funcionalidad de agregar
const agregarAlCarrito = () => {
  const botonAgregar = document.querySelectorAll('button.botonAgregar');
  botonAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const productoSeleccionado = parseInt(boton.id);
      let meterAlCarrito = ZapasJordan.find((zapa) => zapa.id === productoSeleccionado);
      if (meterAlCarrito) {
        const productoEnCarrito = carrito.findIndex((producto) => producto.id === productoSeleccionado);
        if (productoEnCarrito !== -1) {
          carrito[productoEnCarrito].cantidad += 1;
        } else {
          meterAlCarrito.cantidad = 1;
          carrito.push(meterAlCarrito);
        }
      }
      console.table(carrito)
      const valorTotalCarrito = calcularValorTotal(carrito, ZapasJordan);
      console.log('Valor total del carrito:', valorTotalCarrito);
    });
  });
}
agregarAlCarrito()

let total = calcularValorTotal(carrito);
console.table(carrito);
console.log("El valor total de tus Jordan es: $" + total);
let precioTotalElement = document.getElementById("precioTotal");
precioTotalElement.innerHTML = `El valor total de tus Jordan es: $${total} \u{1F600}`;