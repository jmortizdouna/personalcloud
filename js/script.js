document.addEventListener("DOMContentLoaded", () => {
    // seleccionamos todas las tarjetas .item
    let tarjetas = document.querySelectorAll(".item");
    actualizarContadorCarrito();
    // Para cada tarjeta de producto
  document.querySelectorAll(".item").forEach(itemCard => {
    let radios = itemCard.querySelectorAll('input[type="radio"]');
    let precioLabel = itemCard.querySelector(".label-precio");
    let btnComprar = itemCard.querySelector(".btn-comprar");

    // Verificamos que existan elementos (por si la tarjeta no tiene botón o precio)
    if (!precioLabel || !btnComprar) return;

    // Escuchamos cambios en los radio buttons
    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        let precio = radio.dataset.precio;

        //Restablecemos todas las demás tarjetas
        tarjetas.forEach(ortaCard =>{
            if (ortaCard !== itemCard){
                let ortoLabel = ortaCard.querySelector(".label-precio");
                let ortoBtn = ortaCard.querySelector(".btn-comprar");
                if (ortoLabel) ortoLabel.textContent = "-";
                if (ortoBtn) ortoBtn.disabled = true;
            }
        });

        // Si tiene precio, lo mostramos y habilitamos el botón
        if (precio) {
          precioLabel.textContent = precio;
          btnComprar.disabled = false;
        }
        
      });
    });

    // Evento al hacer clic en "Comprar"
    btnComprar.addEventListener("click", () => {
      let seleccionado = Array.from(radios).find(r => r.checked);
      let valor = seleccionado ? seleccionado.value : "";
      let precio = seleccionado ? seleccionado.dataset.precio : "";
      let nombreProducto = itemCard.querySelector(".card-title").textContent;
      //contador del carrito
      actualizarContadorCarrito();

      //Cosntrimos el objeto producto
      let producto ={
        nombre: nombreProducto,
        disco: valor,
        precio: parseFloat(precio)
      }
      //recuperamos el carrito actual
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      //agregamos el nuevo producto
      carrito.push(producto);

      //guardamos en localStorage
      localStorage.setItem("carrito",JSON.stringify(carrito));

      alert(`Agregaste al carrito:\n- ${itemCard.querySelector(".card-title").textContent}\n- Disco: ${valor}\n- Precio: $${precio}`);
      //opcion de actualizar la pagina
      location.reload();
      //opcion de redireccion
      //window.location.href = "carrito.html";
    });
  });

  function actualizarContadorCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("contador-carrito");
    if (contador) {
      contador.textContent = carrito.length;
      contador.style.display = carrito.length > 0 ? "inline-block" : "none";
    }
  }

});