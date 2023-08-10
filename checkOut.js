document.addEventListener("DOMContentLoaded", () => {
const tablaCarrito = ({ img, nombre, precio, genero, cantidad, id } = producto) => {
    return `
      <tr id="prod">
        <td><img class="imgCheckOut" src="${img}"></td>
        <td>${nombre}</td>
        <td>${genero}</td>
        <td>${precio}</td>
        <td class="cantidadProducto producto-id-${id}">${cantidad}</td>
        <td><button class="botonAgregar" id=${id}>&#x2795;</button></td>
        <td><button class="botonEliminar" id=${id}>&#x2796;</button></td>
      </tr>
    `;
  };

  
  
  let prodEnCheckout = document.querySelector("#prodEnCheckout");
  let tablaCompleta = document.querySelector('#tablaCompleta')
  let empty = document.querySelector('#empty')
  tablaCompleta.style.display = "none"
//contador() = 'cantidad en el carrito 0' ? tablaCompleta.style.display = "none" : cargarCarrito(carrito);

const cargarCarrito = (array) => {
  prodEnCheckout.innerHTML = '';
  if (array.length > 0) {
    let carritoHTML = '';
    array.forEach((producto) => {
      carritoHTML += tablaCarrito(producto);
    });
    prodEnCheckout.innerHTML = carritoHTML;

    // Mostrar la tabla completa y ocultar el mensaje de carrito vacío
    tablaCompleta.style.display = "grid";
    empty.style.display = "none";

    console.table(carrito);
  } else {
    // Ocultar la tabla completa y mostrar el mensaje de carrito vacío
    tablaCompleta.style.display = "none";
    empty.style.display = "block";
  }
};

cargarCarrito(carrito);

  
  // Función para disminuir la cantidad de un producto en el carrito
const disminuirCantidadEnCarrito = (productoId) => {
    const productoEnCarrito = carrito.findIndex((producto) => producto.id === productoId);
    if (productoEnCarrito !== -1) {
      if (carrito[productoEnCarrito].cantidad > 1) {
        carrito[productoEnCarrito].cantidad -= 1;
        // Actualiza la cantidad en la celda correspondiente en la tabla
        const cantidadElemento = document.querySelector(`.producto-id-${productoId} .cantidadProducto`);
        if (cantidadElemento) {
          cantidadElemento.textContent = carrito[productoEnCarrito].cantidad;
        }
      } else {
        carrito.splice(productoEnCarrito, 1); // Si la cantidad es 1, eliminar el producto del carrito
        console.table(carrito)
      }
      cargarCarrito(carrito);
      mostrarPrecio();
      contador();
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  };  
  

//Sweet alert
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


  // Elimina un elemento del carrito
  const eliminarDelCarrito = () => {
    const botonEliminar = document.querySelectorAll('button.botonEliminar');
    botonEliminar.forEach((boton) => {
          boton.addEventListener('click', () => {
            swalWithBootstrapButtons.fire({
              title: 'Estás segur@?',
              text: "Si te arrepentís puede que alguien más se las lleve 🤷🏻‍♂️",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, me arriesgo',
              cancelButtonText: 'No, las quiero!',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                  'Eliminadas! 😭',
                  'Esas zapas increibles ya no están en tu carrito',
                  'error'
                )
                const productoId = parseInt(boton.id);
            disminuirCantidadEnCarrito(productoId); // Llama a la función para disminuir la cantidad
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Buena decisión',
                  `estas 👟 siguen siendo tuyas`,
                  'success'
                )
              }
            })
          });
        });
    
  }
  eliminarDelCarrito();

  // Suma un elemento desde el checkout
  const sumarDesdeCheckOut = () => {
    const botonEliminar = document.querySelectorAll('button.botonAgregar');
    botonEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const productoId = parseInt(boton.id);
        agregarAlCarrito(productoId); // Llama a la función para aumentar la cantidad
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agregado al carrito 🛒',
          showConfirmButton: false,
          timer: 1500
        })
      });
    });
  };
  sumarDesdeCheckOut();
  
  // Función para agregar un producto al carrito
const agregarAlCarrito = (productoId) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === productoId);
  
  if (productoEnCarrito) {
    // Si el producto ya existe en el carrito, aumenta la cantidad en 1
    productoEnCarrito.cantidad += 1;
    // Actualiza la cantidad en la celda correspondiente en la tabla
    const cantidadElemento = document.querySelector(`.producto-id-${productoId} .cantidadProducto`);
    if (cantidadElemento) {
      cantidadElemento.textContent = productoEnCarrito.cantidad;
    }
  } 

  cargarCarrito(carrito);
  mostrarPrecio();
  contador();
  localStorage.setItem('carrito', JSON.stringify(carrito));
};
  
})