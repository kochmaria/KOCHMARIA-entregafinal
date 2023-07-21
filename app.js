console.log("El script 'app.js' se ha cargado correctamente.");

console.log ("Inicio proceso")
setTimeout(()=>{
  console.log("Mitad de proceso")

}, 0);
console.log ("Fin proceso")
let carrito = [];
let nombreUsuario;

let mensaje = "Tienda de auriculares"
console.log(mensaje)

document.addEventListener('DOMContentLoaded', function() {
   console.log("El evento DOMContentLoaded se ha activado.");


});





const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items');
const precioTotalElement = document.getElementById('precio-total');
const vaciarCarritoButton = document.getElementById('vaciar-carrito');

const agregarProductoAlCarrito = (producto) => {
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: `${producto.nombre} ha sido agregado al carrito.`,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    showConfirmButton: false
  });
};

const eliminarProductoDelCarrito = (productId) => {
  Swal.fire({
    icon: 'question',
    title: '¿Estás seguro?',
    text: '¿Deseas eliminar este producto del carrito?',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((producto) => producto.id !== productId);
      guardarCarrito();
      mostrarCarrito();
      
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito.',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
      });
    }
  });
};


const guardarCarrito = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const mostrarCarrito = () => {
  cartItemsContainer.innerHTML = '';
  let precioTotal = 0;

  carrito.forEach((producto) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('CartItem');
    productDiv.innerHTML = `
      <div class="product-info">
        <div class="row">
          <div class="col-lg-3">
            <div class="product-image">
              <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
          </div>
          <div class="col-lg-9">
            <div class="product-details">
              <h1 class="nombre-producto">${producto.nombre}</h1>
              <p>${producto.description}</p>
              <p>${producto.precio}</p>
              <button class="eliminar-producto btn btn-danger" data-id="${producto.id}">Eliminar el producto</button>
            </div>
          </div>
        </div>
      `;
    cartItemsContainer.appendChild(productDiv);
    precioTotal += producto.precio;
  });

  const eliminarButtons = document.querySelectorAll('.eliminar-producto');
  eliminarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      eliminarProductoDelCarrito(Number(productId));
    });
  });

  precioTotalElement.textContent = 'Precio Total: ' + precioTotal.toFixed(2);
  precioTotalElement.style.fontSize = '30px';

  vaciarCarritoButton.addEventListener('click', () => {
    carrito = [];
    
   
    guardarCarrito();
    mostrarCarrito();
    
    Swal.fire({
      icon: 'success',
      title: 'Carrito vaciado',
      text: 'Se ha vaciado el carrito de compras.',
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  });
};




const inicializarCarrito = () => {
  const carritoGuardado = localStorage.getItem('carrito');

  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  mostrarCarrito();
};

inicializarCarrito();

// Obtén el botón y el div del popup
const btnAceptarCookies = document.getElementById('btn-aceptar-cookies');
const popupCookies = document.getElementById('popup-cookies');

// Mostrar el popup
const mostrarPopup = () => {
  popupCookies.style.display = 'block';
};

// Ocultar el popup
const ocultarPopup = () => {
  popupCookies.style.display = 'none';
};

// Agregar el evento click al botón para mostrar el popup
btnAceptarCookies.addEventListener('click', () => {
  mostrarPopup();

  // Cerrar automáticamente el popup después de 3 segundos (3000 milisegundos)
  setTimeout(() => {
    ocultarPopup();
  }, 1000);
});


// Función para mostrar el mensaje al hacer clic en el botón "Pagar"
const btnPagarClick = () => {
  Swal.fire({
    icon: 'info',
    title: '¡Atención!',
    text: '¿Deseas finalizar tu compra y pagar?',
    showCancelButton: true,
    confirmButtonText: 'Pagar',
    cancelButtonText: 'Seguir comprando',
    confirmButtonColor: '#007bff',
    cancelButtonColor: '#dc3545',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu compra!',
        text: 'Tu compra ha sido realizada con éxito.',
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
      });
      
    }
  });
};


const btnPagar = document.getElementById('btn-pagar');
btnPagar.addEventListener('click', btnPagarClick);




let usuarioPresente = true;

// Función para mostrar el mensaje de "¿Sigues aquí?" después de 5 minutos de inactividad
const mostrarMensajeInactividad = () => {
  if (!usuarioPresente) {
    Swal.fire({
      icon: 'question',
      title: '¿Sigues aquí?',
      text: 'Hace un tiempo que no has interactuado con la página. ¿Deseas seguir comprando?',
      showCancelButton: true,
      confirmButtonText: 'Sí, sigo aquí',
      cancelButtonText: 'No, finalizar',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        usuarioPresente = true;
        // Reiniciar el intervalo para seguir verificando la inactividad
      } else {
        
        console.log('Usuario finalizó la interacción.');
      }
    });
  } else {
    usuarioPresente = false;
  }
};

// Establecer el intervalo para mostrar el mensaje cada 5 minutos (300000 ms)
setInterval(mostrarMensajeInactividad, 300000);


document.addEventListener("DOMContentLoaded", function () {
  console.log("El evento DOMContentLoaded se ha activado.");

  // Cargar los productos desde el archivo JSON
  fetch("./JSON/productos.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos obtenidos:", data);

      const productos = data.productos;
      const productContainer = document.getElementById("product-container");

      productos.forEach((producto) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("Producto");
        productDiv.style.backgroundColor = "white";
        productDiv.innerHTML = `
          <div class='card'>
            <h3>${producto.id}</h3>
            <h1>${producto.nombre}</h1>
            <div class="product-image-container">
              <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top product-image">
            </div>
            <div class="card-body">
              <p>${producto.precio}</p>
              <p>${producto.description}</p>
              <button class="agregar-carrito btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        `;

        productContainer.appendChild(productDiv);

        const addButton = productDiv.querySelector(".agregar-carrito");

        addButton.addEventListener("click", () => {
          agregarProductoAlCarrito(producto);
        });
      });

      // Inicializar el carrito después de cargar los productos
      inicializarCarrito();
    })
    .catch((err) => console.log(err));
});

































       


















