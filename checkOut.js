document.addEventListener("DOMContentLoaded", () => {
const tablaCarrito = ({ img, nombre, precio, genero, cantidad, id } = producto) => {
    return `
      <tr id="prod">
        <td><img class="imgCheckOut" src="${img}"></td>
        <td>${nombre}</td>
        <td>${genero}</td>
        <td>${precio}</td>
        <td class="cantidadProducto producto-id-${id}">${cantidad}</td>
        <td><button class="botonAgregarCarrito" id=${id}>&#x2795;</button></td>
        <td><button class="botonEliminar" id=${id}>&#x2796;</button></td>
      </tr>
    `;
  };

  
  const compraFinal = JSON.parse(localStorage.getItem('compra final')) || []
  let prodEnCheckout = document.querySelector("#prodEnCheckout");
  let tablaCompleta = document.querySelector('#tablaCompleta')
  let empty = document.querySelector('#empty')
  let gracias = document.querySelector('#gracias')
  tablaCompleta.style.display = "none"
//contador() = 'cantidad en el carrito 0' ? tablaCompleta.style.display = "none" : cargarCarrito(carrito);

//mostrar u ocultar elementos en el DOM
const mostrarElemento = (elemento, mostrar) => {
  elemento.style.display = mostrar ? "flex" : "none";
};

const cargarCarrito = (array) => {
  prodEnCheckout.innerHTML = '';
  if (array.length > 0) {
    let carritoHTML = '';
    array.forEach((producto) => {
      carritoHTML += tablaCarrito(producto);
    });
    prodEnCheckout.innerHTML = carritoHTML;

    // Mostrar la tabla completa y ocultar el mensaje de carrito vacío
    mostrarElemento(tablaCompleta,true)
    mostrarElemento(empty,false)
    mostrarElemento(gracias,false)

    console.table(carrito);
  } else {
    // Ocultar la tabla completa y mostrar el mensaje de carrito vacío
    mostrarElemento(tablaCompleta,false)
    mostrarElemento(empty,true)
    mostrarElemento(gracias,false)
  }
};
cargarCarrito(carrito);



const cargarCompraFinal = (array) => {
  prodEnCheckout.innerHTML = '';
  if (array.length > 0) {
    // Mostrar TY page
    mostrarElemento(tablaCompleta,false);
    mostrarElemento(empty,false);
    mostrarElemento(gracias,true);

    console.table(compraFinal);
  } else {
    // Ocultar la tabla completa y mostrar el mensaje de carrito vacío
    mostrarElemento(tablaCompleta,false);
    //mostrarElemento(empty,false);
    mostrarElemento(gracias,true);
  }
};

  
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
    const botonEliminar = document.querySelectorAll('button.botonAgregarCarrito');
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
  
const finalizarCompra = () => {
  const botonFinalizarCompra = document.querySelector('button#finalizarCompra')
  botonFinalizarCompra.addEventListener('click', () => {
    localStorage.setItem('compra final',JSON.stringify(carrito));
    localStorage.removeItem('carrito');
    carrito.length = 0;
    cargarCompraFinal(compraFinal);
  })
}
finalizarCompra()

const homeBack = async (array) => {
  const home = document.querySelector('.home')
  const compraFinal = await JSON.parse(localStorage.getItem('compra final'))
  home.addEventListener('click', () => {
  if (array.length > 0) {
    localStorage.removeItem('compra final');
    compraFinal.length = 0;
    console.log('Orden de compra eliminado del localStorage');
  }
})
}
homeBack(compraFinal)

})