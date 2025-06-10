document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartList = document.getElementById('cart-list');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button'); // Get the checkout button
    let cart = [];

    // Function to update the cart display
    function updateCartDisplay() {
        cartList.innerHTML = ''; // Clear existing items
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toLocaleString('es-CO')}</span>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotalSpan.textContent = `$${total.toLocaleString('es-CO')}`;
    }

    // Add event listeners to "Agregar" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.dataset.name;
            const itemPrice = parseInt(event.target.dataset.price);

            const existingItemIndex = cart.findIndex(item => item.name === itemName);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }
            updateCartDisplay();
        });
    });

    // Modified checkout button event listener
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu equipo frutal está incompleto. ¡Suma héroes a tu misión saludable!');
            return;
        }

        // Prepare the message for WhatsApp
        let whatsappMessage = "¡Llamando al escuadrón frutal! Estoy listo para pedir mi arsenal vitamínico:\n\n";
        let totalOrderPrice = 0;

        cart.forEach(item => {
            whatsappMessage += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toLocaleString('es-CO')})\n`;
            totalOrderPrice += item.price * item.quantity;
        });

        whatsappMessage += `\n El valor de tu nergía frutal acumulada es: $${totalOrderPrice.toLocaleString('es-CO')}\n`;
        whatsappMessage += `\n¡Gracias por tu apoyo al Frutiverso!`;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp number
        const phoneNumber = '+57 3142707164'; // Your WhatsApp number

        // Construct the WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Clear the cart after sending the order
        alert('Prepárate para contactar la base secreta del Frutiverso por WhatsApp y completar tu misión.');
        cart = []; // Clear the cart
        updateCartDisplay();
    });

    updateCartDisplay(); // Initial display of the empty cart
});

// Modified checkout button event listener
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. ¡Agrega algunos productos!');
            return;
        }

        // Prepare the message for WhatsApp
        let whatsappMessage = "¡Hola! Me gustaría hacer un pedido:\n\n";
        let totalOrderPrice = 0;

        cart.forEach(item => {
            whatsappMessage += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toLocaleString('es-CO')})\n`;
            totalOrderPrice += item.price * item.quantity;
        });

        whatsappMessage += `\nTotal a pagar: $${totalOrderPrice.toLocaleString('es-CO')}\n`;
        whatsappMessage += `\n¡Gracias!`;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp number
        const phoneNumber = '+57 3142707164'; // Your WhatsApp number

        // Construct the WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Clear the cart after sending the order
        alert('Serás redirigido a WhatsApp para finalizar tu pedido.');
        cart = []; // Clear the cart
        updateCartDisplay();
    });