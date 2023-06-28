/*
// Definir una lista de precios de tenis Jordan
let preciosJordan = [150, 200, 180, 220, 250];

// Función para calcular el valor total de las zapatillas Jordan
function calcularValorTotal(cantidad) {
    var valorTotal = 0;
  
    // Ciclo para recorrer la lista de precios y calcular el valor total
    for (var i = 0; i < preciosJordan.length; i++) {
      // Verificar si hay suficiente cantidad del producto
      if (cantidad[i] > 0) {
        // Calcular el valor del producto multiplicando el precio por la cantidad
        var valorProducto = preciosJordan[i] * cantidad[i];
        valorTotal += valorProducto;
      }
    }
  
    return valorTotal;
  }

// uso con prompt
const cantidadTenis = [];
for (let i = 0; i < preciosJordan.length; i++) {
  let cantidad = prompt("Ingresa la cantidad de tenis Jordan del modelo " + (i + 1));
  cantidadTenis.push(parseInt(cantidad));
}

let total = calcularValorTotal(cantidadTenis);
console.log("El valor total de los tenis Jordan es: $" + total);
let precioTotalElement = document.getElementById("precioTotal");
precioTotalElement.innerHTML = "El valor total de los tenis Jordan es: $" + total;
*/

// Definir una lista de precios de tenis Jordan
let preciosJordan = [150, 200, 180, 220, 250];

// Función para calcular el valor total de las zapatillas Jordan
function calcularValorTotal() {
  let valorTotal = 0;
  // Ciclo para recorrer la lista de precios y calcular el valor total
  for (let i = 0; i < preciosJordan.length; i++) {
    let cantidad = prompt("Ingresa la cantidad de tenis Jordan del modelo " + (i + 1));
    cantidad = parseInt(cantidad);

    // Verificar si hay suficiente cantidad del producto
    if (cantidad > 0) {
      // Calcular el valor del producto multiplicando el precio por la cantidad
      let valorProducto = preciosJordan[i] * cantidad;
      valorTotal += valorProducto;
    }else{
      return prompt('No elegiste ninguna de nuestras zapatillas.')
    }
  }

  return valorTotal;
}

// Calcular el valor total
let total = calcularValorTotal();

console.log("El valor total de los tenis Jordan es: $" + total);
let precioTotalElement = document.getElementById("precioTotal");
precioTotalElement.innerHTML = "El valor total de los tenis Jordan es: $" + total;
