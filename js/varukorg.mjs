const userId = localStorage.getItem("userId");
const user = localStorage.getItem("user");

const cartContainer = document.getElementById("cart-container");
const stripePaymentButton = document.getElementById("stripe-payment-button");

if (user) {
  const userData = JSON.parse(user);
  if (userData.cart && userData.cart.cartItems) {
    displayProducts(userData);
    removeProductFromCart(userData);
  }
}


function displayProducts(userData) {
    cartContainer.innerHTML = "";

    userData.cart.cartItems.forEach(cartItem => {
        const product = cartItem.product; // Hämta produktdetaljer från varukorgen
        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.productName}">
            <div class="cart-details"> 
            <strong>${product.productName}</strong><br>
            <p>Antal: ${cartItem.amount}</p>
            <p>Rostningsgrad: ${product.roastLevel}</p>
            <p>Ursprungsland: ${product.originCountry}</p>
            </div>
            <p>Pris: ${product.price} kr</p>
            <button class="removeFromCartBtn" data-product-id="${product.productId}">🗑️</button>
        `;

        
        cartContainer.appendChild(productElement);
        const cartDetails = document.querySelector(".cart-details");
        cartDetails.addEventListener('click', () => {
            goToProduct(
                product.productName, 
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
}

async function removeProductFromCart(userData) {
  const removeFromCartBtns = document.querySelectorAll(".removeFromCartBtn");
  const cartId = userData.cart.cartId;

  removeFromCartBtns.forEach(button => {
    button.addEventListener("click", async (event) => {
      // Säkerställ att vi utgår från ett element (om t.ex. en textnod klickas)
      const clickedElement = event.target.nodeType === Node.TEXT_NODE 
                              ? event.target.parentElement 
                              : event.target;
      const buttonElement = clickedElement.closest('.removeFromCartBtn');
      if (!buttonElement) return; // Avbryt om vi inte hittar knappen

      const productId = buttonElement.dataset.productId;
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/cartItem/delete/${cartId}/${productId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const result = await response.text();
        console.log("Product removed:", result);
        
        // Ta bort varukortsobjektet från DOM
        const cartItemElement = buttonElement.closest('.cart-item');
        if (cartItemElement) {
          cartItemElement.remove();
        }
      } catch (error) {
        console.error("Error removing product:", error);
      }
    });
  });
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

  function goToProduct(name, price, image, roastLevel, originCountry, description, id) {
    const userId = localStorage.getItem("userId");
    const url = `detalj.html?name=${encodeURIComponent(name)}
        &price=${encodeURIComponent(price)}
        &image=${encodeURIComponent(image)}
        &roastLevel=${encodeURIComponent(roastLevel)}
        &originCountry=${encodeURIComponent(originCountry)}
        &description=${encodeURIComponent(description)}
        &productId=${encodeURIComponent(id)}
        &userId=${encodeURIComponent(userId)}`;
    window.location.href = url;
}