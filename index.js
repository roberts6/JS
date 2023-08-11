// Definir una lista de precios de tenis Jordan
let ZapasJordan = [];

const URL = './zapas.json'

const obtenerInfoZapas = () => {
  fetch(URL)
  .then((response) => response.json())
  .then((data) => ZapasJordan.push(...data))
  .then(() => cargarCard(ZapasJordan))
  .catch((error) => console.log(error))
}
obtenerInfoZapas()

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// imprime en HTML el valor total del carrito
let mostrarPrecio = () => {
  let precioTotalElement = document.getElementById("precioTotal");
  let precioEnCarrito = carrito.reduce((total, zapa) => total + (zapa.precio * zapa.cantidad), 0);
  precioEnCarrito > 0 ? 
precioTotalElement.innerHTML = `El valor total de tus Jordan es: $${precioEnCarrito} 💰` : ''
}
mostrarPrecio()

// imprime en HTML la cantidad total de productos dentro del carrito
let contador = () => {
  let contador = document.querySelector('#contador');
  let cantidadEnCarrito = carrito.reduce((total, zapa) => total + zapa.cantidad, 0);
  cantidadEnCarrito > 0 ? 
  contador.innerHTML = `${cantidadEnCarrito}` : ''
  console.log('cantidad en el carrito',cantidadEnCarrito)
}
contador()

// Captura el contenedor en el hTML
let productoEnElCarrito = document.getElementById("productosEnElCarrito");

// funcionalidad de crear cards 
const card = ({img, nombre, precio, genero, id} = producto) => {
  return `
  <div class = "card">
     <div><img class = "imgCard" src = "${img}"></div>
     <div class = "nombreCard"><p>${nombre}</p></div>
     <div class = "generoCard"><p>Género: ${genero}</p></div>
     <div class = "precioCard"><p><b>$${precio}</b></p></div>
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
agregarAlCarrito()
console.table(carrito)
}
//cargarCard(ZapasJordan)


// Funcionalidad del buscador 
const inputSearch = document.querySelector('#buscador')
inputSearch.addEventListener('search', () => {
  const inputSearchResult = inputSearch.value.toLocaleLowerCase();
  const resultado = ZapasJordan.filter((zapa) => zapa.nombre.toLocaleLowerCase().includes(inputSearchResult) || zapa.genero.toLocaleLowerCase().includes(inputSearchResult) || zapa.modelo.toLocaleLowerCase().includes(inputSearchResult))
  console.table(resultado)
  cargarCard(resultado)
  agregarAlCarrito()
})

// funcionalidad de agregar al carrito
const agregarAlCarrito = () => {
  const botonAgregar = document.querySelectorAll('button.botonAgregar');
  botonAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const productoSeleccionado = parseInt(boton.id);
      let meterAlCarrito = ZapasJordan.find((zapa) => zapa.id === productoSeleccionado);
      if (meterAlCarrito) {
        const productoEnCarrito = carrito.findIndex((producto) => producto.id === productoSeleccionado);
        if (productoEnCarrito !== -1) {
          carrito[productoEnCarrito].cantidad ++;
          localStorage.setItem('carrito',JSON.stringify(carrito))
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado al carrito 🛒',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          meterAlCarrito.cantidad = 1;
          carrito.push(meterAlCarrito);
          localStorage.setItem('carrito',JSON.stringify(carrito))
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado al carrito 🛒',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
      console.table(carrito)
contador()
mostrarPrecio()
    });
  });
} 
agregarAlCarrito()

// simulación de carga de página
document.addEventListener("DOMContentLoaded", () => {
  const cuerpo = document.querySelector("#cuerpo")
  const showImg = document.querySelector("#showImg")
  cuerpo.style.display = "none";
  
  const displayContent = () => {
    cuerpo.style.display = "grid";
    showImg.style.display = "none";
  };

  // Agrega la imagen al cuerpo y luego muestra el contenido después de 2000 milisegundos (2 segundos)
  setTimeout(displayContent, 1500);
});



// API tomada de RapidAPI --> no la pude hacer funcionar 😔
// const url = 'https://jordan-shoes.p.rapidapi.com/shoes/%7Bid%7D';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '541ed19c62msh0c56db5414ca8eap1a309ajsn3ae8dfc8100d',
// 		'X-RapidAPI-Host': 'jordan-shoes.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }