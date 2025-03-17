const userId = localStorage.getItem("userId");
const cartContainer = document.getElementById("cart-container");
const stripePaymentButton = document.getElementById("stripe-payment-button");


if (userId) {
    console.log("userID  funkar"); 
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

if (stripePaymentButton && userId) {
    stripePaymentButton.addEventListener("click", () => {
      fetch(`http://localhost:8080/api/v1/checkout/${userId}`, {
        method: 'POST'
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
      })
      .then(checkoutUrl => {
        // Omdirigera användaren till Stripe Checkout
        window.location.href = checkoutUrl;
      })
      .catch(error => {
        console.error("Fel vid betalningsinitiering:", error);
        alert("Något gick fel med betalningen. Försök igen senare.");
      });
    });
  } else {
    console.error("Kunde inte hitta betalningsknappen eller userId saknas i localStorage.");
  }