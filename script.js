// Este arreglo simula nuestro carrito de compras.
// Almacenará los productos que el usuario agregue.
let carrito = [];

// 1. Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
    const producto = {
        nombre: nombreProducto,
        precio: precioProducto
    };
    carrito.push(producto); // Agregamos el producto al arreglo del carrito
    mostrarMensajeDeConfirmacion(`${nombreProducto} ha sido añadido al carrito.`);
    console.log("Estado actual del carrito:", carrito);
    actualizarTotalCarrito();
}

// 2. Función para mostrar un mensaje de confirmación temporal en la página
function mostrarMensajeDeConfirmacion(mensaje) {
    const body = document.querySelector('body');
    let mensajeDiv = document.querySelector('.confirmacion-mensaje');

    if (!mensajeDiv) {
        // Si el div no existe, lo creamos
        mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('confirmacion-mensaje');
        body.appendChild(mensajeDiv);
    }

    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block';

    // Ocultamos el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

// 3. Función para simular el proceso de compra
function simularCompra() {
    if (carrito.length === 0) {
        mostrarMensajeDeConfirmacion("El carrito está vacío. ¡Agrega productos para comprar!");
        return;
    }
    
    // Limpiamos el carrito (simulando que la compra se completó)
    carrito = [];
    mostrarMensajeDeConfirmacion("¡Gracias por tu compra! El pedido ha sido procesado.");
    console.log("El carrito ha sido vaciado. Estado final:", carrito);
    actualizarTotalCarrito();
}

// Función para actualizar el total del carrito (opcional pero muy útil)
function actualizarTotalCarrito() {
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    console.log(`El total del carrito es: $${total}`);
    // Aquí puedes actualizar un elemento en el HTML con el total
}

// Event listeners para conectar el HTML con las funciones
// Esto es un ejemplo. Tendrás que adaptar los botones en tu HTML.
document.addEventListener('DOMContentLoaded', () => {
    // Escuchar clics en los botones de "Agregar al carrito"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productoCard = event.target.closest('.product-card');
            const nombre = productoCard.querySelector('h3').textContent;
            // En un proyecto real, el precio sería un número. Aquí lo parseamos.
            const precioTexto = productoCard.querySelector('p').textContent.replace('$', '');
            const precio = parseFloat(precioTexto);
            agregarAlCarrito(nombre, precio);
        });
    });

    // Escuchar clic en el botón de "Comprar" (deberás agregarlo a tu HTML)
    const btnComprar = document.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', simularCompra);
    }
});
