document.addEventListener("DOMContentLoaded",() =>{
    let lista =document.getElementById("lista-carrito");
    let totalPrecio = document.getElementById("total-precio");
    let cantidadTotal = document.getElementById("cantidad-total");
    let btnVaciar = document.getElementById("vaciar-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    //Mostrar productos
    lista.innerHTML =""
    let total = 0;

    carrito.forEach((producto, index) =>{
        let li = document.createElement("li");
        li.textContent = `${producto.nombre} - Disco: ${producto.disco} - $${producto.precio.toLocaleString()}`;
        lista.appendChild(li);
        total += producto.precio;
    });
        
    //mosrtar totales
    cantidadTotal.textContent = carrito.length;
    totalPrecio.textContent = total.toLocaleString();

    //Boton para vaciar carrito
    btnVaciar.addEventListener("click",()=>{
        localStorage.removeItem("carrito");
        location.reload();
    });

    
    const btnPagar    = document.getElementById("btn-pagar");
    const detalleDiv  = document.getElementById("detalle");
    const textareaCar = document.getElementById("carritoDato");
    const textareaTot = document.getElementById("totalCarrito");

    btnPagar.addEventListener("click", () => {
  //  Recuperar el carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Construir el HTML del resumen
  if (carrito.length === 0) {
    detalleDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  let html = `<table class="table">
    <thead><tr><th>Producto</th><th>Disco</th><th>Precio</th></tr></thead><tbody>`;
  let total = 0;

  carrito.forEach(item => {
    html += `<tr>
      <td>${item.nombre}</td>
      <td>${item.disco}</td>
      <td>$${item.precio.toLocaleString()}</td>
    </tr>`;
    total += item.precio;
  });

  html += `</tbody>
    <tfoot>
      <tr>
        <th colspan="2">Total</th>
        <th>$${total.toLocaleString()}</th>
      </tr>
    </tfoot>
  </table>`;

  detalleDiv.innerHTML = html;

  // Volcar los datos al formulario oculto para envío
  textareaCar.value = carrito
    .map(i => `${i.nombre} (${i.disco}) - $${i.precio}`)
    .join("\n");
  textareaTot.value = `$${total.toLocaleString()}`;

  // Scrollear al formulario para que el usuario lo vea
  document.getElementById("formulario").scrollIntoView({behavior: "smooth"});
});


});