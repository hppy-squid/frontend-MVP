const user = localStorage.getItem("user"); 
const cartContainer = document.getElementById("cart-container");

if (cartContainer) {
    console.log("cartContainer funkar"); 
}



function displayProducts(user) {
    cartContainer.innerHTML = "";
    

    user.cart.cartItems.forEach(cartItem => {
        const product = cartItem.product; // Hämta produktdetaljer från varukorgen

        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.productName}">
            <div class="cart-details"> 
            <h3>${product.productName}</h3>
            <p>Antal: ${cartItem.amount}</p>
            </div>
             <p>Pris: ${product.price} kr</p>
            <p>Rostningsgrad: ${product.roastLevel}</p>
            <p>Ursprungsland: ${product.originCountry}</p>
            <button class="removeFromCartBtn" onclick="removeFromCart('${cartItem.cartItemId}')">🗑️</button>
        `;

        cartContainer.appendChild(productElement);

        productGrid.appendChild(productElement);
        productElement.addEventListener('click', () => {
            goToProduct(
                product.name, 
                product.price, 
                product.image, 
                product.roastLevel, 
                product.originCountry, 
                product.description,
                product.id
            );
        });
        if (productElement) {
        console.log('productElement hittades');
    }
    });

    displayProducts(user);
}