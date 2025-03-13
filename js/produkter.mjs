const productGrid = document.getElementById("product-grid")
if (productGrid) {
    console.log("product-grid hittades");
}

fetch("http://localhost:8080/api/v1/allProduct", {
    method: "GET" ,
    headers: {
        "Content-Type": "application/json"
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error("Kunde ej nå server");
    }
    return response.json();
})
.then(data => {
    console.log("Produkter hämtade: ", data);
    displayProducts(data);

})
.catch(error => {
    console.error("Kunde ej hämta produkter")
});

function displayProducts(products) {
    

    // addToCartBtn ej klar, här ska produkt skickas till personens cart --------------------------------
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
            <p>${product.roastLevel}</p>
            <p>${product.originCountry}</p>
            <button class="addToCartBtn" onclick="addToCart(${product.id})">🛒</button>
        `;

        productGrid.appendChild(productElement);
        productElement.addEventListener('click', () => {
            goToProduct(
                product.name, 
                product.price, 
                product.image, 
                product.roastLevel, 
                product.originCountry, 
                product.description
            );
        });
        if (productElement) {
        console.log('productElement hittades');
    }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    let roastLevel = "All";
    let originCountry = "All";

    document.querySelectorAll(".roast-filter").forEach(button => {
        button.addEventListener("click", () => {
            roastLevel = button.dataset.filter;
            filterProducts(roastLevel, originCountry);
        });
    });

    document.querySelectorAll(".country-filter").forEach(button => {
        button.addEventListener("click", () => {
            originCountry = button.dataset.country;
            filterProducts(roastLevel, originCountry);
        });
    });
});

function filterProducts(roastCategory, countryCategory) {
    let products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const roastLevel = product.querySelector('p:nth-child(4)').textContent.trim();
        const originCountry = product.querySelector('p:nth-child(5)').textContent.trim();

        const matchRoast = roastCategory === "All" || roastLevel.includes(roastCategory);
        const matchCountry = countryCategory === "All" || originCountry.includes(countryCategory);

        if (matchRoast && matchCountry) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function goToProduct(name, price, image, roastLevel, originCountry, description) {
    const url = `detalj.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&roastLevel=${encodeURIComponent(roastLevel)}&originCountry=${encodeURIComponent(originCountry)}&description=${encodeURIComponent(description)}`;
    
    window.location.href = url;
}

