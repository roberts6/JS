document.addEventListener("DOMContentLoaded", () => {
const tablaCarrito = ({ img, nombre, precio, cantidad, id } = producto) => {
    return `
      <tr id="prod">
        <td><img class="imgCheckOut" src="${img}"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td class="cantidadProducto producto-id-${id}">${cantidad}</td>
        <td><button class="botonAgregar" id=${id}>&#x2795;</button></td>
        <td><button class="botonEliminar" id=${id}>&#x2796;</button></td>
      </tr>
    `;
  };
  
  let prodEnCheckout = document.querySelector("#prodEnCheckout");
  
  const cargarCarrito = (array) => {
    prodEnCheckout.innerHTML = '';
    array.forEach((producto) => {
      prodEnCheckout.innerHTML += tablaCarrito(producto);
    });
    console.table(carrito)
  };
  cargarCarrito(carrito);
  
  // Función para disminuir la cantidad de un producto en el carrito
const disminuirCantidadEnCarrito = (productoId) => {
    const productoEnCarrito = carrito.findIndex((producto) => producto.id === productoId);
    if (productoEnCarrito !== -1) {
      if (carrito[productoEnCarrito].cantidad > 1) {
        carrito[productoEnCarrito].cantidad -= 1;
        // Actualiza la cantidad en la celda correspondiente en la tabla
        const cantidadElement = document.querySelector(`.producto-id-${productoId} .cantidadProducto`);
        if (cantidadElement) {
          cantidadElement.textContent = carrito[productoEnCarrito].cantidad;
        }
      } else {
        carrito.splice(productoEnCarrito, 1); // Si la cantidad es 1, eliminar el producto del carrito
      }
      cargarCarrito(carrito);
      mostrarPrecio();
      contador();
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  };  
  
  // Elimina un elemento del carrito
  const eliminarDelCarrito = () => {
    const botonEliminar = document.querySelectorAll('button.botonEliminar');
    botonEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const productoId = parseInt(boton.id);
        disminuirCantidadEnCarrito(productoId); // Llama a la función para disminuir la cantidad
      });
    });
  };
  eliminarDelCarrito();
  
  // Agrega uno más desde el checkout
  const agregarDesdeCheckOut = () => {
    const botonAgregar = document.querySelectorAll('button.botonAgregar');
    botonAgregar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const productoSeleccionado = parseInt(boton.id);
        let meterAlCarrito = ZapasJordan.find((zapa) => zapa.id === productoSeleccionado);
        if (meterAlCarrito) {
          const productoEnCarrito = carrito.findIndex((producto) => producto.id === productoSeleccionado);
          if (productoEnCarrito !== -1) {
            carrito[productoEnCarrito].cantidad += 1;
            // Actualiza la cantidad en la celda correspondiente en la tabla
            const cantidadElement = document.querySelector(`.producto-id-${productoSeleccionado} .cantidadProducto`);
            if (cantidadElement) {
              cantidadElement.textContent = carrito[productoEnCarrito].cantidad;
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            cargarCarrito(carrito);
            mostrarPrecio();
            contador();
          }
        }
      });
    });
  };

  agregarDesdeCheckOut();
})