// Inicializa el carrito desde localStorage o crea uno nuevo vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Añade un producto al carrito y actualiza localStorage
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    updateCartCount();
}

// Actualiza el contador del carrito
function updateCartCount() {
    let cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Obtiene los productos del carrito
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Elimina un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar en localStorage
    updateCartCount();
    showCartItems(); // Actualizar la lista de productos en el carrito
}

// Muestra los productos en el modal del carrito
function showCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar contenido previo

    let totalCost = 0;

    // Añade cada producto al modal del carrito
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Crear imagen del producto
        const productImage = document.createElement('img');
        productImage.src = item.image; // Suponiendo que la URL de la imagen está en `item.image`
        productImage.alt = item.name;
        productImage.style.width = '50px';
        productImage.style.height = '50px';
        productImage.style.marginRight = '10px';

        // Crear el texto del producto
        const productText = document.createElement('span');
        productText.textContent = `${item.name} - $${item.price}`;

        // Crear botón para eliminar el producto
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => removeFromCart(index));

        // Agregar los elementos al item de la lista
        listItem.appendChild(productImage);
        listItem.appendChild(productText);
        listItem.appendChild(deleteButton);

        cartItemsContainer.appendChild(listItem);
        totalCost += parseFloat(item.price);
    });

    // Mostrar el costo total
    const totalCostElement = document.createElement('li');
    totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
    totalCostElement.style.fontWeight = 'bold';
    cartItemsContainer.appendChild(totalCostElement);
}

// Cambia la visibilidad del carrito
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('show-cart');
    showCartItems(); // Llama a showCartItems para mostrar los productos cuando el modal esté visible
}

// Agrega el producto al carrito cuando se hace clic en "Comprar"
document.querySelectorAll('.shampoo-buy-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product');
        const price = event.target.getAttribute('data-price');
        const image = event.target.getAttribute('data-image'); // Asegúrate de tener esta propiedad en el botón

        const product = { name: productName, price: price, image: image };
        addToCart(product);
    });
});

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('show-cart');
    showCartItems(); // Actualiza la lista de productos
}

// Event listener para mostrar/ocultar el modal del carrito
document.querySelector('.fa-shopping-bag').addEventListener('click', toggleCart);


// Al cargar la página, actualiza el número de productos en el carrito
updateCartCount();


