const tablaCarrito = ({img, nombre, precio, cantidad, id} = producto) => {
     return `
     <tr id="prod">
                     <td>${img}</td>
                     <td>${nombre}</td>
                     <td>${precio}</td>
                     <td>${cantidad}</td>
                     <td id='sumar'>&#x2795;</td>
                     <td><button class="botonEliminar" id=${id}>&#x2796;</button></td>
                     
     </tr>
     `
   }
   
   let prodEnCheckout = document.querySelector("#tabla #prodEnCheckout");
   
   const cargarCarrito = (array) => {
    prodEnCheckout.innerHTML = ''
    array.forEach((producto) => {
    prodEnCheckout.innerHTML += tablaCarrito(producto)
  })
  }
  cargarCarrito(carrito)

    // Elimina un elemento del array
    const eliminarDelCarrito = () => {
        const botonEliminar = document.querySelectorAll('button.botonEliminar');
        botonEliminar.forEach((boton) => {
            boton.addEventListener('click', () => {
                const eliminarProducto = parseInt(boton.id);
                const productoEnCarrito = carrito.findIndex((producto) => producto.id === eliminarProducto);
                if (productoEnCarrito !== -1) {
                    carrito[productoEnCarrito].cantidad -= 1;
                    carrito.splice(productoEnCarrito, 1);
                    cargarCarrito(carrito);
                    mostrarPrecio();
                    contador();
                }
            });
        });
    };
    eliminarDelCarrito()  

    // agrega uno más desde el checkout
    const agregarDesdeCheckOut = () => {
        agregarAlCarrito()
    }
    agregarDesdeCheckOut()