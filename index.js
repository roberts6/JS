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
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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

// funcionalidad de crear cards 
const card = ({img, nombre, precio, genero, id} = producto) => {
  return `
  <div class = "card">
     <div class = "imgCard"><img src = "${img}"></div>
     <div class = "imgCard"><p>${nombre}</p></div>
     <div class = "imgCard"><p>Género: ${genero}</p></div>
     <div class = "imgCard"><p><b>$${precio}</b></p></div>
     <button class = "botonAgregar" id=${id}>Agregar</button>
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
          localStorage.setItem('carrito',JSON.stringify(carrito))
        }
      }
      console.table(carrito)
      const valorTotalCarrito = calcularValorTotal(carrito, ZapasJordan);
      console.log('Valor total del carrito:', valorTotalCarrito);
      let precioTotalElement = document.getElementById("precioTotal");
precioTotalElement.innerHTML = `El valor total de tus Jordan es: $${valorTotalCarrito} \u{1F600}`;
    });
  });
}
agregarAlCarrito()

const verCarritoEnHTML = () => {
  
}


